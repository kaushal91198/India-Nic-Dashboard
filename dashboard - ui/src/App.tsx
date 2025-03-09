import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import Dashboard from "./pages/dashboard";
import AdminRoutes from "./auth/adminroutes";
import AdminPanel from "./pages/adminpanel";
import UserRoutes from "./auth/userroutes";
import Adminsettings from "./pages/adminsettings";
import Dashboardsettings from "./pages/dashboardsettings";
import PublicRoutes from "./auth/publicroutes";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicRoutes />}>
            <Route path="/" element={<Login />} />
            <Route path="register" element={<SignUp />} />
          </Route>
          <Route element={<AdminRoutes />}>
            <Route path="/admin-dashboard" element={<AdminPanel />} />
            <Route path="/admin-settings" element={<Adminsettings />} />
            {/* other admin routes */}
          </Route>
          <Route element={<UserRoutes />}>
            <Route path="/user-dashboard" element={<Dashboard />} />
            <Route path="/user-settings" element={<Dashboardsettings />} />
            {/* other user routes */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
