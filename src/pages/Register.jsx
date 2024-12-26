import {
  FaGoogle,
  FaEnvelope,
  FaLock,
  FaUser,
  FaImage,
  FaEyeSlash,
  FaEye,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { useContext, useState } from "react";
// import { FoodContext } from "../provider/Foodprovider";
import axios from "axios";
import FoodContext from "../provider/FoodContext";

import register_bg from "/assets/photos/register_bg.jpg";

function Register() {
  const { createUser, updateUserProfile, signInWithGoogle, setUser } =
    useContext(FoodContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordTyped, setIsPasswordTyped] = useState(false);

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
        "https://dailydishserver.vercel.app/auth/jwt",
        userInfo,
        { withCredentials: true }, // Save token in cookies
      );

      // Verify Token
      const verifyResponse = await axios.get(
        "https://dailydishserver.vercel.app/auth/verify",
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
      const res = await axios.post(
        "https://dailydishserver.vercel.app/auth/jwt",
        userInfo,
        {
          withCredentials: true,
        },
      );

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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-amber-50 to-amber-100 px-6 py-10">
    <ToastContainer />
  
    <div className="flex w-full max-w-6xl overflow-hidden rounded-3xl shadow-2xl bg-white">
      {/* Left Side: Form */}
      <div className="w-full md:w-1/2 p-8 sm:p-12">
        <h2 className="mb-6 text-4xl font-extrabold text-amber-800">Create Account</h2>
        <p className="mb-8 text-lg text-gray-600">Join us to start sharing delicious recipes and discover amazing dishes!</p>
  
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
              className="w-full rounded-lg border border-gray-300 bg-gray-50 py-3 pl-10 pr-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
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
              className="w-full rounded-lg border border-gray-300 bg-gray-50 py-3 pl-10 pr-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
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
              className="w-full rounded-lg border border-gray-300 bg-gray-50 py-3 pl-10 pr-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>
  
          {/* Password Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FaLock className="text-gray-400" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              className="w-full rounded-lg border border-gray-300 bg-gray-50 py-3 pl-10 pr-10 text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
              onChange={(e) => setIsPasswordTyped(e.target.value.length > 0)}
            />
            {isPasswordTyped && (
              <div
                className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaEyeSlash className="text-gray-400" />
                ) : (
                  <FaEye className="text-gray-400" />
                )}
              </div>
            )}
          </div>
  
          <button
            type="submit"
            className="w-full rounded-lg bg-gradient-to-r from-amber-500 to-amber-700 py-3 font-bold text-white hover:from-amber-600 hover:to-amber-800 focus:outline-none"
          >
            Register Now
          </button>
        </form>
  
        {/* Google Sign-In */}
        <div className="mt-8 flex flex-col items-center">
          <div className="mb-4 text-gray-500">Or</div>
          <button
            onClick={handleSignInWithGoogle}
            className="flex w-full transform items-center justify-center rounded-lg border border-gray-300 bg-white py-3 text-gray-700 transition-all duration-300 hover:scale-105 hover:shadow-md"
          >
            <FaGoogle className="mr-3 text-amber-500" />
            Continue with Google
          </button>
        </div>
  
        {/* Login Link */}
        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account? 
          <Link to="/login" className="text-amber-500 hover:text-amber-600">
            Login
          </Link>
        </div>
      </div>
  
      {/* Right Side: Image Section */}
      <div className="hidden md:block w-1/2 bg-cover bg-center" style={{
        backgroundImage: `url(${register_bg})`
      }}></div>
    </div>
  </div>
  
  );
}

export default Register;
