import {
  Navigate,
  Outlet,
} from "react-router-dom";
import { useSelector } from "react-redux";
import RoutePaths from "./RoutePath";

const PrivateRoutes = () => {
  const user = useSelector(
    (state: any) => state.user
  ); // Ensure user state is correctly set

  return user ? (
    <Outlet />
  ) : (
    <Navigate to={RoutePaths.AUTH} />
  );
};

export default PrivateRoutes;
