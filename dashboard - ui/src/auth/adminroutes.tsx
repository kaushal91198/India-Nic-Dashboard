// src/routes/AdminRoutes.tsx
import { Navigate, Outlet } from "react-router";
import { useAuthStatus } from "../hooks/useAuth";
import Sidebar from "../components/Sidebar";
import { AdminDashMenubar } from "../utils/utils";

const AdminRoutes = () => {
  const { isAuthenticated, role } = useAuthStatus();

  // While authentication status is loading
  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // If authenticated but role is not admin, redirect to appropriate dashboard
  if (role !== "admin") {
    // For example, if role is user, redirect to user dashboard
    return <Navigate to="/user-dashboard" replace />;
  }

  // Render admin layout with sidebar and nested routes
  return (
    <div className="flex h-screen bg-baseline-400">
      <Sidebar DashMenubar={AdminDashMenubar} Logo="Admin" />
      <div className="flex flex-col flex-1">
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminRoutes;
