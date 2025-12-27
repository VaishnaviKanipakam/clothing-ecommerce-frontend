import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const jwtToken = Cookies.get("jwt_token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!jwtToken || !user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
