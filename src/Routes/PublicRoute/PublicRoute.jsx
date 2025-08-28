import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

const PublicRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (user) {
    // If logged in, redirect away from signin/signup
    return <Navigate to="/profile" replace />;
  }
  return children;
};

export default PublicRoute;
