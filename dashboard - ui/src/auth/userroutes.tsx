// src/routes/UserRoutes.tsx
import { Navigate, Outlet } from "react-router";
import { useAuthStatus } from "../hooks/useAuth";
import Sidebar from "../components/Sidebar";
import { UserDashMenubar } from "../utils/utils";

const UserRoutes = () => {
  const { isAuthenticated, role } = useAuthStatus();

  // While checking auth status
  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  // Not authenticated: redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // If authenticated but role is not user, redirect to admin dashboard (or appropriate page)
  if (role !== "user") {
    return <Navigate to="/admin-dashboard" replace />;
  }

  // Render nested user routes (with a user layout if needed)
  return (
    <div className="flex h-screen bg-baseline-400">
      <Sidebar DashMenubar={UserDashMenubar} Logo="User" />
      <div className="flex flex-col flex-1">
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserRoutes;
