import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/hooks/useAuth";
import { Zap, Shield, Users, AlertTriangle } from "lucide-react";

export default function Landing() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const result = await login(username, password);
    
    if (!result.success) {
      setError(result.error || "Error de inicio de sesión");
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Zap className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-blue-700">GC ELECTRICAL</h1>
                <p className="text-sm text-blue-600">SOLUTIONS, LLC</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Sistema de Gestión de Personal</p>
              <p className="text-xs text-gray-500">Versión 2.0</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Información de la empresa */}
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Su Socio en <span className="text-blue-600">Soluciones Eléctricas</span>
            </h2>
            
            <p className="text-xl text-gray-600 mb-8">
              Desde nuestra creación, <strong>GC ELECTRICAL SOLUTIONS, LLC</strong> ha sido sinónimo de calidad y confiabilidad en el mantenimiento de subestaciones eléctricas.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start space-x-3">
                <Shield className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Seguridad Primero</h3>
                  <p className="text-sm text-gray-600">Cumplimos y superamos todas las normativas de seguridad</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Users className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Ejecución Más Rápida</h3>
                  <p className="text-sm text-gray-600">Proyectos completados hasta 20% más rápido</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Zap className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Mantenimiento Preventivo</h3>
                  <p className="text-sm text-gray-600">Reducción de costos a largo plazo</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Respuesta 24/7</h3>
                  <p className="text-sm text-gray-600">Respaldo de emergencia y respuesta rápida</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Nuestra Misión</h3>
              <p className="text-blue-800 text-sm">
                Asegurar la eficiencia y confiabilidad de la infraestructura eléctrica de nuestros clientes, 
                ofreciendo soluciones especializadas y seguras que optimizan costos y previenen fallas.
              </p>
            </div>
          </div>

          {/* Formulario de login */}
          <div className="flex justify-center">
            <Card className="w-full max-w-md">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-gray-900">Iniciar Sesión</CardTitle>
                <CardDescription>
                  Accede al sistema de gestión de personal
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Usuario</Label>
                    <Input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      placeholder="Ingresa tu usuario"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Contraseña</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="Ingresa tu contraseña"
                    />
                  </div>

                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <Button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    disabled={isLoading}
                  >
                    {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
                  </Button>
                </form>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Credenciales de prueba:</p>
                    <div className="text-xs text-gray-500 space-y-1">
                      <p><strong>Usuario:</strong> admin | <strong>Contraseña:</strong> admin123</p>
                      <p><strong>Usuario:</strong> gcadmin | <strong>Contraseña:</strong> gcelectric2025</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-50 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-sm text-gray-600">
              © 2025 GC Electrical Solutions, LLC. Todos los derechos reservados.
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Su socio confiable en soluciones eléctricas especializadas
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}