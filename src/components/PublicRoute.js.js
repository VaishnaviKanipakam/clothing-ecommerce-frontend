import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const PublicRoute = ({ children }) => {
  const jwtToken = Cookies.get("jwt_token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (jwtToken && user) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PublicRoute;
