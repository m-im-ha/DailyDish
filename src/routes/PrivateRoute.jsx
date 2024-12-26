import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../ui/Loading";
import FoodContext from "../provider/FoodContext";


function PrivateRoute({ children }) {
  const { user, loading } = useContext(FoodContext);
  const location = useLocation();

  // console.log("Private Route - User:", user);

  if (loading) return <Loading />;

  // Redirect to login if no user is found
  if (!user) {
    // console.log("Private Route - Redirecting to login...");
    return <Navigate state={location.pathname} to="/login" />;
  }

  // console.log("Private Route - Access granted!");
  return children;
}

export default PrivateRoute;