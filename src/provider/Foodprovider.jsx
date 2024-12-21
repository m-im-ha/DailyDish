import { createContext } from "react";
import { auth } from "../firebase/firebase.init";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

export const FoodContext = createContext();
const googleProvider = new GoogleAuthProvider();

function Foodprovider({ children }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  console.log(`user from provider: `, user);

  function createUser(email, password) {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function loginUser(email, password) {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logOut() {
    return signOut(auth);
  }

  function updateUserProfile(data) {
    return updateProfile(auth.currentUser, data);
  }

  function signInWithGoogle() {
    return signInWithPopup(auth, googleProvider);
  }

  //   function passReset(email) {
  //     return sendPasswordResetEmail(auth, email);
  //   }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

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

export default Foodprovider;
