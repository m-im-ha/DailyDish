import {
  FaGoogle,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import FoodContext from "../provider/FoodContext";

import login_bg from "/assets/photos/login_bg.jpg";

function Login() {
  const { loginUser, setUser, signInWithGoogle, setLoading } =
    useContext(FoodContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordTyped, setIsPasswordTyped] = useState(false);

  // Handle Firebase + Server login
  async function handleLogin(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    const email = form.get("email");
    const password = form.get("password");

    setLoading(true);

    try {
      const userCredential = await loginUser(email, password);
      const user = userCredential.user;
      setUser({ ...user });

      await axios.post(
        "https://dailydishserver.vercel.app/auth/login",
        { email },
        { withCredentials: true },
      );

      Swal.fire({
        title: "Success! You're now logged in. Enjoy exploring our platform!!!",
        icon: "success",
        confirmButtonColor: "Ok",
      });

      navigate(location?.state ? location.state : "/");
    } catch (error) {
      console.error(error.message);

      toast.error("Invalid email or password.", {
        position: "bottom-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "light",
      });
    } finally {
      setLoading(false);
    }
  }

  // Handle Firebase Google login
  async function handleSignInWithGoogle() {
    setLoading(true);

    try {
      const result = await signInWithGoogle();
      setUser(result.user);

      await axios.post(
        "https://dailydishserver.vercel.app/auth/google-login",
        { email: result.user.email },
        { withCredentials: true },
      );

      Swal.fire({
        title: "Success! You're now logged in. Enjoy exploring our platform!",
        icon: "success",
        confirmButtonColor: "Ok",
      });

      navigate(location?.state ? location.state : "/");
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-amber-50 to-amber-100 px-6 py-10">
      <ToastContainer />

      <div className="flex w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* Left Side: Form */}
        <div className="w-full p-8 sm:p-12 md:w-1/2">
          <h2 className="font-playfair mb-6 text-5xl font-extrabold text-amber-800">
            Welcome Back
          </h2>
          <p className="font-lato mb-8 text-lg text-gray-600">
            Enter your credentials to access your account
          </p>

          <form onSubmit={handleLogin} className="space-y-6">
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
              Login
            </button>
          </form>

          {/* Google Login */}
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

          <div className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?
            <Link
              to="/register"
              className="pl-2 font-semibold text-amber-500 hover:text-amber-600"
            >
              Register Now
            </Link>
          </div>
        </div>

        {/* Right Side: Image Section */}
        <div
          className="hidden w-1/2 bg-cover bg-center md:block"
          style={{
            backgroundImage: `url(${login_bg})`,
          }}
        ></div>
      </div>
    </div>
  );
}

export default Login;
