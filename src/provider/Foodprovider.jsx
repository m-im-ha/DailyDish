import { useEffect, useState } from "react";
import axios from "axios";
import { auth } from "../firebase/firebase.init";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  GoogleAuthProvider,
} from "firebase/auth";

import FoodContext from "./FoodContext";

const googleProvider = new GoogleAuthProvider();

export default function Foodprovider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initialAuthCheck, setInitialAuthCheck] = useState(true);

  function createUser(email, password) {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function loginUser(email, password) {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logOut() {
    setLoading(true);
    return signOut(auth);
  }

  function updateUserProfile(data) {
    return updateProfile(auth.currentUser, data);
  }

  function signInWithGoogle() {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Firebase Auth State Changed:", currentUser);

      if (currentUser?.email) {
        // Set cookie on server and update state
        axios
          .post(
            "http://localhost:5000/auth/login",
            { email: currentUser.email },
            { withCredentials: true }
          )
          .then((res) => {
            console.log("Cookie set:", res.data);
            setUser({
              email: currentUser.email,
              displayName: currentUser.displayName,
              photoURL: currentUser.photoURL,
            });
          })
          .catch((err) => {
            console.error("Failed to set cookie:", err.message);
            setUser(null);
          })
          .finally(() => {
            setLoading(false);
            setInitialAuthCheck(false); 
          });
      } else {
        
        axios
          .post("http://localhost:5000/auth/logout", {}, { withCredentials: true })
          .then(() => {
            setUser(null);
          })
          .catch((err) => console.error("Failed to clear cookie:", err.message))
          .finally(() => {
            setLoading(false);
            setInitialAuthCheck(false); 
          });
      }
    });

    return () => unsubscribe();
  }, []);

  console.log("User from provider:", user);

  if (initialAuthCheck) {
    console.log("Waiting for Firebase auth check...");
    return null; 
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
