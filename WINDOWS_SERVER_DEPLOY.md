# Guía de Deployment en Windows Server 2022

## Requisitos Previos

### 1. Instalación de Node.js
```powershell
# Descargar e instalar Node.js LTS desde https://nodejs.org/
# Verificar instalación
node --version
npm --version
```

### 2. Instalación de PostgreSQL
```powershell
# Descargar PostgreSQL desde https://www.postgresql.org/download/windows/
# Durante instalación, recordar:
# - Usuario: postgres
# - Contraseña: [tu_contraseña_segura]
# - Puerto: 5432
```

### 3. Herramientas adicionales
```powershell
# Instalar Git
# Descargar desde https://git-scm.com/download/win

# Instalar PM2 globalmente (para gestión de procesos)
npm install -g pm2
npm install -g pm2-windows-startup

# Configurar PM2 para inicio automático
pm2-startup install
```

## Preparación del Servidor

### 1. Configurar Firewall de Windows
```powershell
# Abrir PowerShell como Administrador
New-NetFirewallRule -DisplayName "Node.js App" -Direction Inbound -Protocol TCP -LocalPort 5000 -Action Allow
New-NetFirewallRule -DisplayName "PostgreSQL" -Direction Inbound -Protocol TCP -LocalPort 5432 -Action Allow
```

### 2. Crear directorio de aplicación
```powershell
# Crear directorio para la aplicación
New-Item -ItemType Directory -Path "C:\Apps\gcelectric-prosecu"
cd "C:\Apps\gcelectric-prosecu"
```

## Deployment de la Aplicación

### 1. Clonar o copiar archivos
```powershell
# Opción A: Si usas Git
git clone [tu_repositorio] .

# Opción B: Copiar archivos manualmente
# Copiar todos los archivos del proyecto a C:\Apps\gcelectric-prosecu\
```

### 2. Configurar base de datos
```sql
-- Conectar a PostgreSQL como usuario postgres
-- Crear base de datos
CREATE DATABASE gcelectric_prosecu;

-- Crear usuario para la aplicación
CREATE USER gcelectric_user WITH PASSWORD 'tu_password_seguro';
GRANT ALL PRIVILEGES ON DATABASE gcelectric_prosecu TO gcelectric_user;
```

### 3. Configurar variables de entorno
```powershell
# Crear archivo .env en el directorio raíz
@"
NODE_ENV=production
DATABASE_URL=postgresql://gcelectric_user:tu_password_seguro@localhost:5432/gcelectric_prosecu
PORT=5000
SESSION_SECRET=tu_session_secret_muy_largo_y_seguro_aqui
PGHOST=localhost
PGPORT=5432
PGDATABASE=gcelectric_prosecu
PGUSER=gcelectric_user
PGPASSWORD=tu_password_seguro
"@ | Out-File -FilePath ".env" -Encoding UTF8
```

### 4. Instalar dependencias y construir
```powershell
# Instalar dependencias
npm install

# Construir aplicación para producción
npm run build

# Aplicar migraciones de base de datos
npm run db:push
```

### 5. Configurar PM2
```powershell
# Crear archivo ecosystem.config.js
@"
module.exports = {
  apps: [{
    name: 'gcelectric-prosecu',
    script: 'dist/index.js',
    instances: 1,
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 5000
    },
    error_file: 'logs/err.log',
    out_file: 'logs/out.log',
    log_file: 'logs/combined.log',
    time: true,
    autorestart: true,
    max_restarts: 10,
    min_uptime: '10s'
  }]
};
"@ | Out-File -FilePath "ecosystem.config.js" -Encoding UTF8

# Crear directorio de logs
New-Item -ItemType Directory -Path "logs" -Force

# Iniciar aplicación con PM2
pm2 start ecosystem.config.js
pm2 save
```

## Configuración de IIS (Opcional - Proxy Reverso)

### 1. Instalar IIS y ARR
```powershell
# Habilitar IIS
Enable-WindowsOptionalFeature -Online -FeatureName IIS-WebServerRole, IIS-WebServer, IIS-CommonHttpFeatures, IIS-HttpErrors, IIS-HttpLogging, IIS-RequestFiltering, IIS-StaticContent, IIS-DefaultDocument

# Descargar e instalar Application Request Routing (ARR) desde Microsoft
# https://www.iis.net/downloads/microsoft/application-request-routing
```

### 2. Configurar sitio web en IIS
```xml
<!-- Crear web.config en el directorio del sitio IIS -->
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <system.webServer>
    <rewrite>
      <rules>
        <rule name="GC Electric PROSECU" stopProcessing="true">
          <match url="(.*)" />
          <conditions>
            <add input="{CACHE_URL}" pattern="^(https?)://" />
          </conditions>
          <action type="Rewrite" url="{C:1}://localhost:5000/{R:1}" />
        </rule>
      </rules>
    </rewrite>
  </system.webServer>
</configuration>
```

## Scripts de Mantenimiento

### 1. Script de inicio automático
```powershell
# Crear script startup.ps1
@"
# Script de inicio automático para GC Electric PROSECU
cd "C:\Apps\gcelectric-prosecu"
pm2 resurrect
"@ | Out-File -FilePath "startup.ps1" -Encoding UTF8

# Programar tarea en el Programador de Tareas de Windows
schtasks /create /tn "GC Electric PROSECU Startup" /tr "powershell.exe -File C:\Apps\gcelectric-prosecu\startup.ps1" /sc onstart /ru "SYSTEM"
```

### 2. Script de backup de base de datos
```powershell
# Crear script backup.ps1
@"
# Script de backup de base de datos
`$date = Get-Date -Format "yyyyMMdd_HHmmss"
`$backupPath = "C:\Backups\gcelectric_prosecu_`$date.sql"

# Crear directorio de backup si no existe
New-Item -ItemType Directory -Path "C:\Backups" -Force

# Realizar backup
& "C:\Program Files\PostgreSQL\15\bin\pg_dump.exe" -h localhost -p 5432 -U gcelectric_user -d gcelectric_prosecu -f `$backupPath

Write-Host "Backup completado: `$backupPath"

# Eliminar backups antiguos (más de 7 días)
Get-ChildItem "C:\Backups\gcelectric_prosecu_*.sql" | Where-Object {`$_.LastWriteTime -lt (Get-Date).AddDays(-7)} | Remove-Item
"@ | Out-File -FilePath "backup.ps1" -Encoding UTF8

# Programar backup diario
schtasks /create /tn "GC Electric PROSECU Backup" /tr "powershell.exe -File C:\Apps\gcelectric-prosecu\backup.ps1" /sc daily /st 02:00
```

## Monitoreo y Logs

### 1. Verificar estado de la aplicación
```powershell
# Ver estado de PM2
pm2 status

# Ver logs en tiempo real
pm2 logs

# Verificar conexión a base de datos
Test-NetConnection -ComputerName localhost -Port 5432

# Verificar aplicación web
Test-NetConnection -ComputerName localhost -Port 5000
```

### 2. Configurar alertas (Opcional)
```powershell
# Instalar PM2 monitoring
pm2 install pm2-server-monit

# Configurar notificaciones por email (requiere configuración adicional)
```

## Acceso y URLs

Una vez configurado correctamente:

- **Aplicación principal**: `http://servidor_ip:5000`
- **Con IIS configurado**: `http://servidor_ip` o `http://nombre_dominio`

## Credenciales de Acceso

- **Usuario**: admin | **Contraseña**: admin123
- **Usuario**: gcadmin | **Contraseña**: gcelectric2025

## Comandos Útiles de Mantenimiento

```powershell
# Reiniciar aplicación
pm2 restart gcelectric-prosecu

# Ver logs de errores
pm2 logs gcelectric-prosecu --err

# Actualizar aplicación
cd "C:\Apps\gcelectric-prosecu"
git pull  # Si usas Git
npm install
npm run build
pm2 restart gcelectric-prosecu

# Verificar rendimiento
pm2 monit
```

## Solución de Problemas Comunes

### Error de conexión a base de datos
```powershell
# Verificar servicio PostgreSQL
Get-Service postgresql*
# Si está detenido: Start-Service postgresql-x64-15
```

### Aplicación no inicia
```powershell
# Verificar logs
pm2 logs gcelectric-prosecu

# Verificar variables de entorno
pm2 env 0  # donde 0 es el ID del proceso
```

### Puerto ocupado
```powershell
# Verificar qué proceso usa el puerto 5000
netstat -ano | findstr :5000
# Terminar proceso si es necesario: taskkill /PID [PID_NUMBER] /F
```

## Seguridad Adicional

1. **Configurar SSL/HTTPS** usando IIS con certificado válido
2. **Firewall**: Restringir acceso solo a IPs autorizadas
3. **Actualizaciones**: Mantener Windows Server, Node.js y PostgreSQL actualizados
4. **Backups**: Implementar backup automático tanto de base de datos como archivos
5. **Monitoreo**: Configurar alertas de rendimiento y disponibilidad

Esta configuración te dará una instalación robusta y lista para producción de tu sistema PROSECU en Windows Server 2022.