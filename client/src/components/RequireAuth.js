import { useLocation, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Dashboard from "../pages/Dashboard";

const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();
  console.log(auth.username);

  return auth?.username ? (
    <Dashboard />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default RequireAuth;
