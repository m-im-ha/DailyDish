import { FaGoogle, FaEnvelope, FaLock, FaUser, FaImage } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { useContext } from "react";
// import { FoodContext } from "../provider/Foodprovider";
import axios from "axios";
import FoodContext from "../provider/FoodContext";

function Register() {
  const { createUser, updateUserProfile, signInWithGoogle, setUser } =
    useContext(FoodContext);
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    const name = form.get("name");
    const email = form.get("email");
    const Photo_URL = form.get("Photo_URL");
    const password = form.get("password");
  
    const passValidation =
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
  
    if (!passValidation.test(password)) {
      toast.error(
        `Password must be at least 6 characters with a mix of symbols, uppercase, lowercase letters, and numbers.`,
      );
      return;
    }
  
    try {
      // Create user with Firebase
      const userCredential = await createUser(email, password);
      const firebaseUser = userCredential.user;
  
      // Update user profile
      await updateUserProfile({
        displayName: name,
        photoURL: Photo_URL,
      });
  
      setUser({
        ...firebaseUser,
        displayName: name,
        photoURL: Photo_URL,
      });
  
      // Create JWT token for backend
      const userInfo = { email: firebaseUser.email };
      await axios.post(
        "http://localhost:5000/auth/jwt",
        userInfo,
        { withCredentials: true }, // Save token in cookies
      );
  
      // Verify Token
      const verifyResponse = await axios.get(
        "http://localhost:5000/auth/verify",
        { withCredentials: true },
      );
  
      if (verifyResponse.data.email) {
        Swal.fire({
          title: "Welcome aboard! Let's make the most of your experience.",
          icon: "success",
        });
        navigate("/", { replace: true });
      } else {
        throw new Error("Token verification failed.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("Failed to register. Please try again.");
    }
  }
  

  // Handle Google Sign-In with JWT
  async function handleSignInWithGoogle() {
    try {
      const result = await signInWithGoogle();
      const googleUser = result.user;

      setUser({
        ...googleUser,
        displayName: googleUser.displayName || "User",
        photoURL: googleUser.photoURL || "",
      });

      // Create JWT Token for Google User
      const userInfo = { email: googleUser.email };
      const res = await axios.post("http://localhost:5000/auth/jwt", userInfo, {
        withCredentials: true,
      });

      if (res.data.success) {
        Swal.fire({
          title: "Welcome aboard! Let's make the most of your experience.",
          icon: "success",
          confirmButtonColor: "Ok",
        });
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to sign in with Google.");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <ToastContainer />

      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-gray-700 bg-gray-800 shadow-2xl">
        <div className="p-8 text-center">
          <div className="mb-8">
            <h2 className="mb-4 bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 bg-clip-text text-4xl font-extrabold text-gray-100 text-transparent">
              Create Your Account
            </h2>
            <p className="text-sm text-gray-400">
              Enter your details to start your journey
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            {/* Name Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FaUser className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Full Name"
                name="name"
                className="w-full rounded-xl border border-gray-600 bg-gray-700 py-3 pl-10 pr-4 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
                required
              />
            </div>

            {/* Photo URL Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FaImage className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Photo URL"
                name="Photo_URL"
                className="w-full rounded-xl border border-gray-600 bg-gray-700 py-3 pl-10 pr-4 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>

            {/* Email Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FaEnvelope className="text-gray-400" />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                name="email"
                className="w-full rounded-xl border border-gray-600 bg-gray-700 py-3 pl-10 pr-4 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
                required
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FaLock className="text-gray-400" />
              </div>
              <input
                type="password"
                placeholder="Password"
                name="password"
                className="w-full rounded-xl border border-gray-600 bg-gray-700 py-3 pl-10 pr-4 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-pink-500 py-3 font-bold text-white hover:bg-pink-600"
            >
              Register Now
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="h-px flex-grow bg-gray-600"></div>
            <span className="text-sm text-gray-400">OR</span>
            <div className="h-px flex-grow bg-gray-600"></div>
          </div>

           {/* Google Sign-In */}
           <button
            onClick={handleSignInWithGoogle}
            className="flex w-full transform items-center justify-center rounded-xl border border-gray-600 bg-gray-700 py-3 text-gray-200 transition-all duration-300 hover:scale-105 hover:bg-gray-600 active:scale-95"
          >
            <FaGoogle className="mr-3 text-yellow-400" />
            Continue with Google
          </button>

            {/* Login Link */}
            <div className="mt-6 text-center">
            <span className="text-sm text-gray-400">
              Already have an account?{" "}
              <Link to="/login" className="text-pink-400 hover:text-pink-500">
                Login
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
