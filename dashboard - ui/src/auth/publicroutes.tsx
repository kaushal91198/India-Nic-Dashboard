// ProtectedRoute.tsx

import { Navigate, Outlet } from "react-router";
import { useAuthStatus } from "../hooks/useAuth";

const PublicRoutes = () => {
  const { isAuthenticated } = useAuthStatus();

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  } else {
    console.log(isAuthenticated);
    return !isAuthenticated ? (
      <Outlet />
    ) : (
      <Navigate to="/user-dashboard" replace />
    );
  }
};

export default PublicRoutes;
