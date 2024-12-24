import { useEffect, useState } from "react";
import { auth } from "../firebase/firebase.init";
import axios from "axios";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import FoodContext from "./FoodContext";

const googleProvider = new GoogleAuthProvider();

export default function Foodprovider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log(`User from provider: `, user);

  // JWT Verification with Backend
  async function verifyToken() {
    try {
      const res = await axios.get("http://localhost:5000/auth/verify", {
        withCredentials: true,
      });

      if (res.data.email) {
        setUser({ email: res.data.email }); // Set user based on verified email
        return true;
      }
    } catch (error) {
      console.error("JWT verification failed:", error.message);
      setUser(null); // Clear user on failure
    }
    return false;
  }


  // Listen for Firebase Authentication State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setLoading(true);
  
        // small delay before verifying the token
        setTimeout(async () => {
          const isValid = await verifyToken(); // Verify token only after a slight delay
          if (!isValid) {
            setUser(null);
          } else {
            setUser(currentUser); // Set user if valid
          }
          setLoading(false);
        }, 500);
      } else {
        setUser(null);
        setLoading(false);
      }
    });
  
    return () => unsubscribe();
  }, []);
  

  // Auth Functions
  function createUser(email, password) {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function loginUser(email, password) {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logOut() {
    return signOut(auth).then(() => {
      axios.post("http://localhost:5000/auth/logout", {}, { withCredentials: true });
      setUser(null);
    });
  }

  function updateUserProfile(data) {
    return updateProfile(auth.currentUser, data);
  }

  function signInWithGoogle() {
    return signInWithPopup(auth, googleProvider);
  }


  return (
    <FoodContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
        createUser,
        loginUser,
        logOut,
        updateUserProfile,
        signInWithGoogle,
      }}
    >
      {children}
    </FoodContext.Provider>
  );
}

