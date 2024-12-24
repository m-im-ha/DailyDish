import { useContext } from "react";
import { FoodContext } from "../provider/Foodprovider";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../ui/Loading";

function PrivateRoute({ children }) {
  const { user, loading } = useContext(FoodContext);
  const location = useLocation();

  if (loading) return <Loading />;

  // Redirect to login if no user is found
  if (!user) {
    return <Navigate state={location.pathname} to="/login" />;
  }

  return children;
}

export default PrivateRoute;
