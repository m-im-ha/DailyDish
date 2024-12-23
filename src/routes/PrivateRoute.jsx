import { useContext } from "react";
import { FoodContext } from "../provider/Foodprovider";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../ui/Loading";

function PrivateRoute({ children }) {
  const { user, loading } = useContext(FoodContext);
  const location = useLocation();
  if (user) return children;
  if (loading) return <Loading />;
  return <Navigate state={location.pathname} to="/login" />;
}

export default PrivateRoute;
