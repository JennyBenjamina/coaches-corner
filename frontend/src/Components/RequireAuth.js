import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import VerticalDashboard from "./VerticalDashboard";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();
  console.log("autho", auth);

  return auth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
    <div className="app-layout">
      <VerticalDashboard />
      <main className="App" style={{ width: "100%" }}>
        <Outlet />
      </main>
    </div>
  ) : auth?.user ? (
    <Navigate to="/unauthorized" replace />
  ) : (
    <Navigate to="/signin" state={{ from: location }} replace />
  );
};

export default RequireAuth;
