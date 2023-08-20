import { Navigate, Outlet } from "react-router-dom";
export default function ProtectedRoutes({ userId }) {
  return userId ? <Outlet /> : <Navigate to="/login" />;
}
