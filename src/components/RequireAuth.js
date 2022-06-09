import { Navigate, useLocation } from "react-router";
import { useAuth } from "../context/AuthContext";

export default function RequireAuth({ children }) {
    const { currentUser } = useAuth();
  let location = useLocation();

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
}