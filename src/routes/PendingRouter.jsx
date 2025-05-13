import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useGetUser } from "../hooks/useGetUser";

const PendingRouter = ({ children }) => {
  const { user } = useGetUser();

  const location = useLocation();

  if (user?.role === "user" && user?.status === "pending") {
    return children;
  } else if (user?.role === "user" && user?.status === "blocked") {
    return <Navigate to="/blocked" />;
  } else {
    return <Navigate to="/" state={{ from: location }} replace={true} />;
  }
};

PendingRouter.propTypes = {
  children: PropTypes.node,
};

export default PendingRouter;
