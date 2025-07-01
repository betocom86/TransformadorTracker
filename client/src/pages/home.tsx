import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Users, Wrench, CheckCircle, AlertTriangle, Calendar } from "lucide-react";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Bienvenido, {user?.fullName || 'Usuario'}
        </h1>
        <p className="text-gray-600 mt-2">
          Sistema de Gestión de Personal - GC Electrical Solutions
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Personal Total</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">
              Empleados activos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Órdenes de Trabajo</CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              Órdenes activas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cumplimiento</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98%</div>
            <p className="text-xs text-muted-foreground">
              Documentos al día
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alertas</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              Alertas pendientes
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* About GC Electric */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-blue-600" />
              <span>Acerca de GC Electrical Solutions</span>
            </CardTitle>
            <CardDescription>
              Su socio confiable en soluciones eléctricas especializadas
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-sm">Especialización</h4>
                  <p className="text-sm text-gray-600">
                    Mantenimiento de subestaciones eléctricas y soluciones especializadas
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-sm">Seguridad Primero</h4>
                  <p className="text-sm text-gray-600">
                    Cumplimos y superamos todas las normativas de seguridad
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-sm">Respuesta 24/7</h4>
                  <p className="text-sm text-gray-600">
                    Respaldo de emergencia y respuesta rápida cuando sea crítico
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              <span>Acciones Rápidas</span>
            </CardTitle>
            <CardDescription>
              Accesos directos a funciones principales del sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <button className="p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="font-semibold text-sm">Personal</div>
                <div className="text-xs text-gray-600">Gestionar empleados</div>
              </button>
              
              <button className="p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="font-semibold text-sm">Órdenes</div>
                <div className="text-xs text-gray-600">Ver trabajos</div>
              </button>
              
              <button className="p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="font-semibold text-sm">Documentos</div>
                <div className="text-xs text-gray-600">Revisar archivos</div>
              </button>
              
              <button className="p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="font-semibold text-sm">Reportes</div>
                <div className="text-xs text-gray-600">Ver estadísticas</div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mission Statement */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Nuestra Misión</h3>
            <p className="text-blue-800">
              Asegurar la eficiencia y confiabilidad de la infraestructura eléctrica de nuestros clientes, 
              ofreciendo soluciones especializadas y seguras que optimizan costos y previenen fallas.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}