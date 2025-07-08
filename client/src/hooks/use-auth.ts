import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export interface User {
  id: number;
  email: string;
  fullName: string;
  role: string;
}

export function useAuth() {
  const { data: user, isLoading, error, refetch } = useQuery<User | null>({
    queryKey: ["/api/auth/me"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      if (!token) return null;
      
      try {
        const response = await fetch("/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem("token");
            return null;
          }
          throw new Error("Failed to fetch user");
        }
        
        return await response.json();
      } catch (error) {
        localStorage.removeItem("token");
        return null;
      }
    },
    retry: false,
  });

  const login = async (email: string, password: string) => {
    const response = await apiRequest("POST", "/api/auth/login", { email, password });
    const data = await response.json();
    localStorage.setItem("token", data.token);
    await refetch(); // Force refetch user data
    return data;
  };

  const register = async (email: string, password: string, fullName: string) => {
    const response = await apiRequest("POST", "/api/auth/register", { 
      email, 
      password, 
      fullName,
      role: "student"
    });
    const data = await response.json();
    localStorage.setItem("token", data.token);
    await refetch(); // Force refetch user data
    return data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return {
    user,
    isLoading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };
}
