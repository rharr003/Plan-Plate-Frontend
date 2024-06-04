import { Navigate, Outlet } from "react-router-dom";
import useLocalAuth from "../../hooks/useLocalAuth";
export default function ProtectedRoutes() {
  const [token] = useLocalAuth();
  return token ? <Outlet /> : <Navigate to="/login" />;
}
