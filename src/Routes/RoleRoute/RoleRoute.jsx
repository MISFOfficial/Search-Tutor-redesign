import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

const RoleRoute = ({ children, allowedRoles = [] }) => {
  const { user, userInfo, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!user || !allowedRoles.includes(userInfo.accountType)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RoleRoute;
