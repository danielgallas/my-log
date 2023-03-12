import { useLocation, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Dashboard from "../pages/Dashboard";

const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.user ? (
    <Dashboard />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
