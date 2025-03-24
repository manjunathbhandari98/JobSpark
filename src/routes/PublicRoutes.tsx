import {
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";
import { useSelector } from "react-redux";
import RoutePaths from "./RoutePath";

const PublicRoutes = () => {
  const user = useSelector(
    (state: any) => state.user
  );
  const location = useLocation();

  // If user is logged in and trying to access auth page, redirect to home or profile
  if (
    user &&
    location.pathname.startsWith(RoutePaths.AUTH)
  ) {
    return (
      <Navigate
        to={RoutePaths.HOME}
        replace
      />
    );
  }

  return <Outlet />;
};

export default PublicRoutes;
