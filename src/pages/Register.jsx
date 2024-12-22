import { FaGoogle, FaEnvelope, FaLock, FaUser, FaImage } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import { FoodContext } from "../provider/Foodprovider";

function Register() {
  const { createUser, updateUserProfile, signInWithGoogle, user, setUser } =
    useContext(FoodContext);
  const navigate = useNavigate();

  function handleRegister(e) {
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
        {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        },
      );
      return;
    }

    createUser(email, password)
      .then(async (userCredential) => {
        // const createdAt = userCredential?.user?.metadata?.creationTime;
        // const newUser = { name, email, createdAt };
        return updateUserProfile({
          displayName: name,
          photoURL: Photo_URL,
        }).then(() => {
          setUser({
            ...userCredential.user,
            displayName: name,
            photoURL: Photo_URL,
            // userID: data.insertedId,
          });
        });
      })
      .then(() => {
        navigate("/", { replace: true });
      })
      .catch((error) => console.error("Error during registration:", error));
  }

  function handleSignInWithGoogle() {
    signInWithGoogle()
      .then((result) => {
        const userData = result.user;
        setUser({
          ...userData,
          displayName: userData.displayName || "User",
          photoURL: userData.photoURL || "",
        });
        navigate("/");
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

            {/* Register Button */}
            <button
              type="submit"
              className="w-full transform rounded-xl bg-gradient-to-r from-pink-500 to-red-500 py-3 font-bold text-white transition-all duration-300 hover:scale-105 hover:from-pink-600 hover:to-red-600 active:scale-95"
            >
              Register Now
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center space-x-4">
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
