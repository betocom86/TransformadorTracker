import { useState, useEffect } from "react";

interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  role: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar si hay una sesión activa
    const storedUser = localStorage.getItem('gcelectric_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem('gcelectric_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      // Validar credenciales simples
      if ((username === 'admin' && password === 'admin123') || 
          (username === 'gcadmin' && password === 'gcelectric2025')) {
        const userData: User = {
          id: '1',
          username: username,
          email: username === 'admin' ? 'admin@gcelectric.us' : 'gcadmin@gcelectric.us',
          fullName: username === 'admin' ? 'Administrador del Sistema' : 'GC Electric Admin',
          role: 'manager'
        };
        
        setUser(userData);
        localStorage.setItem('gcelectric_user', JSON.stringify(userData));
        return { success: true };
      } else {
        return { success: false, error: 'Credenciales incorrectas' };
      }
    } catch (error) {
      return { success: false, error: 'Error de conexión' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('gcelectric_user');
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout
  };
}