// hooks/useAuth.ts
import { useEffect, useState } from "react";
import axiosInstance from "../api/api";

export const useAuthStatus = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [role, setRole] = useState();
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const res = await axiosInstance.get("/auth/status", {
          withCredentials: true,
        });
        setRole(res.data?.role);
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      }
    };

    checkAuthStatus();
  }, []);
  console.log(isAuthenticated, role);
  return { isAuthenticated, role };
};
