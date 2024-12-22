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
import { FoodContext } from "../provider/Foodprovider";

function Login() {
  const { loginUser, setUser, signInWithGoogle, setLoading } =
    useContext(FoodContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordTyped, setIsPasswordTyped] = useState(false);

  function handleLogin(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    const email = form.get("email");
    const password = form.get("password");

    setLoading(true);

    loginUser(email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        setUser({ ...user });

        setLoading(false);
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        console.error(error.message);

        setLoading(false);
        toast.error(`Invalid email or password.`, {
          position: "bottom-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          theme: "light",
        });
      });
  }

  function handleSignInWithGoogle() {
    signInWithGoogle()
      .then((result) => {
        setUser(result.user);
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        console.error(error.message);
      });
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <ToastContainer />

      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-gray-700 bg-gray-800 shadow-2xl">
        <div className="p-8 text-center">
          <div className="mb-8">
            <h2 className="mb-4 bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 bg-clip-text text-4xl font-extrabold text-gray-100 text-transparent">
              Welcome Back
            </h2>
            <p className="text-sm text-gray-400">
              Enter your credentials to access your account
            </p>
          </div>

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
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                className="w-full rounded-xl border border-gray-600 bg-gray-700 py-3 pl-10 pr-10 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
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
              {/* <div className="mt-2 text-right">
                <Link
                  to="/forgetpass"
                  className="text-sm text-pink-400 hover:text-pink-500"
                >
                  Forgot Password?
                </Link>
              </div> */}
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full transform rounded-xl bg-gradient-to-r from-pink-500 to-red-500 py-3 font-bold text-white transition-all duration-300 hover:scale-105 hover:from-pink-600 hover:to-red-600 active:scale-95"
            >
              Login
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center space-x-4">
            <div className="h-px flex-grow bg-gray-600"></div>
            <span className="text-sm text-gray-400">OR</span>
            <div className="h-px flex-grow bg-gray-600"></div>
          </div>

          {/* Google Login */}
          <button
            onClick={handleSignInWithGoogle}
            className="flex w-full transform items-center justify-center rounded-xl border border-gray-600 bg-gray-700 py-3 text-gray-200 transition-all duration-300 hover:scale-105 hover:bg-gray-600 active:scale-95"
          >
            <FaGoogle className="mr-3 text-yellow-400" />
            Continue with Google
          </button>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <span className="text-sm text-gray-400">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-pink-400 hover:text-pink-500"
              >
                Register Now
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
