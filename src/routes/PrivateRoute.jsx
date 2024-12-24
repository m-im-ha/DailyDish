import { useContext, useEffect, useState } from "react";
import { FoodContext } from "../provider/Foodprovider";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../ui/Loading";
import axios from "axios";

function PrivateRoute({ children }) {
  const { user, loading, setUser, setLoading } = useContext(FoodContext);
  const [isVerified, setIsVerified] = useState(false);
  const location = useLocation();

  // Check JWT token validity
  useEffect(() => {
    async function verifyToken() {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/auth/verify", {
          withCredentials: true,
        });
        const verifiedUser = response.data;

        if (verifiedUser && verifiedUser.email) {
          setUser(verifiedUser); // Update context user
          setIsVerified(true); // Mark as verified
        } else {
          setIsVerified(false); // Token invalid or expired
        }
      } catch (error) {
        console.error("Token verification failed:", error.message);
        setIsVerified(false); // Token invalid
      } finally {
        setLoading(false);
      }
    }

    // Verify token only if user doesn't exist in context
    if (!user) {
      verifyToken();
    } else {
      setIsVerified(true);
      setLoading(false);
    }
  }, [user, setUser, setLoading]);

  if (loading) return <Loading />;

  // Redirect to login if not verified or not logged in
  if (!user || !isVerified) {
    return <Navigate state={location.pathname} to="/login" />;
  }

  return children;
}

export default PrivateRoute;
