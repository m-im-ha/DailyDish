import { NavLink, useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import FoodContext from "../provider/FoodContext";
import Loading from "../ui/Loading";

function Navlinks() {
  const { user, setUser, logOut, loading, setLoading } =
    useContext(FoodContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const updateTitle = () => {
      const newTitle = `${location.pathname.slice(1)} | DailyDish`;
      document.title = location.pathname === "/" ? "DailyDish" : newTitle;
    };
    updateTitle();
  }, [location.pathname]);

  useEffect(() => {
    setLoading(false);
  }, [location.pathname, setLoading]);

  const handleLogout = async () => {
    try {
      await logOut();
      setUser(null);
      setIsMenuOpen(false);
    } catch (error) {
      console.error(`Error during logout:`, error);
    }
  };

  const handleNavigation = (targetPath) => {
    console.log(targetPath);
    setIsMenuOpen(false);
  };

  return (
    <>
      {loading && <Loading />}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-amber-50 to-amber-100">
        <div className="container mx-auto px-4">
          <div className="flex h-20 items-center justify-between gap-4">
            {/* Logo */}
            <NavLink
              to="/"
              onClick={() => handleNavigation("/")}
              className="font-playfair whitespace-nowrap bg-gradient-to-r from-amber-800 to-yellow-600 bg-clip-text text-3xl font-extrabold text-transparent transition-all duration-300 hover:from-yellow-600 hover:to-amber-800"
            >
              Daily<span className="text-amber-800">Dish</span>
            </NavLink>

            {/* Nav Links */}
            <nav className="hidden items-center justify-center gap-4 lg:flex">
              {[
                { to: "/", label: "Home" },
                { to: "/availablefoods", label: "Available Foods" },
                { to: "/addfood", label: "Add Foods" },
                { to: "/managemyfoods", label: "Manage Foods" },
                { to: "/myfoodrequest", label: "Requested Foods" },
              ].map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `font-lato whitespace-nowrap px-2 py-2 text-base font-medium transition-all duration-300 ${
                      isActive
                        ? "text-amber-800"
                        : "text-slate-500 hover:text-amber-800"
                    }`
                  }
                  onClick={() => handleNavigation(link.to)}
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* Buttons */}
            <div className="hidden items-center gap-3 lg:flex">
              {user ? (
                <>
                  <button
                    onClick={handleLogout}
                    className="whitespace-nowrap rounded-full bg-gradient-to-r from-amber-600 to-amber-800 px-4 py-2 font-medium text-white transition-all duration-300 hover:from-amber-700 hover:to-amber-900"
                  >
                    LogOut
                  </button>
                  <img
                    className="h-10 w-10 rounded-full object-cover ring-2 ring-amber-600 transition-all duration-300 hover:ring-amber-800"
                    src={user.photoURL}
                    title={user.displayName || "User"}
                    alt="User"
                  />
                </>
              ) : (
                <>
                  <NavLink
                    to="/register"
                    className="whitespace-nowrap rounded-full bg-gradient-to-r from-amber-600 to-amber-800 px-4 py-2 font-medium text-white transition-all duration-300 hover:from-amber-700 hover:to-amber-900"
                  >
                    Register
                  </NavLink>
                  <NavLink
                    to="/login"
                    className="whitespace-nowrap rounded-full bg-gradient-to-r from-purple-600 to-purple-800 px-4 py-2 font-medium text-white transition-all duration-300 hover:from-purple-700 hover:to-purple-900"
                  >
                    Login
                  </NavLink>
                </>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="text-3xl text-amber-800 transition-transform duration-300 hover:scale-110 focus:outline-none lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="flex flex-col gap-4 border-t border-amber-200 bg-gradient-to-b from-amber-50 to-amber-100 px-4 py-6 lg:hidden">
              {[
                { to: "/", label: "Home" },
                { to: "/availablefoods", label: "Available Foods" },
                { to: "/addfood", label: "Add Food" },
                { to: "/managemyfoods", label: "Manage My Foods" },
                { to: "/myfoodrequest", label: "My Food Request" },
              ].map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `text-lg font-medium ${
                      isActive ? "text-amber-800" : "text-gray-600"
                    } transition-all duration-300 hover:text-amber-800`
                  }
                  onClick={() => handleNavigation(link.to)}
                >
                  {link.label}
                </NavLink>
              ))}
              {user ? (
                <div className="flex items-center gap-4 pt-4">
                  <button
                    onClick={handleLogout}
                    className="rounded-full bg-gradient-to-r from-amber-600 to-amber-800 px-4 py-2 font-medium text-white transition-all duration-300 hover:from-amber-700 hover:to-amber-900"
                  >
                    LogOut
                  </button>
                  <div className="group relative">
                    <img
                      className="h-10 w-10 rounded-full object-cover ring-2 ring-amber-600 transition-all duration-300 group-hover:ring-amber-800"
                      src={user.photoURL}
                      title={user.displayName || "User"}
                      alt="User Profile"
                    />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-3 pt-4">
                  <NavLink
                    to="/register"
                    className="rounded-full bg-gradient-to-r from-amber-600 to-amber-800 px-6 py-2 text-center font-medium text-white transition-all duration-300 hover:from-amber-700 hover:to-amber-900"
                  >
                    Register
                  </NavLink>
                  <NavLink
                    to="/login"
                    className="rounded-full bg-gradient-to-r from-purple-600 to-purple-800 px-6 py-2 text-center font-medium text-white transition-all duration-300 hover:from-purple-700 hover:to-purple-900"
                  >
                    Login
                  </NavLink>
                </div>
              )}
            </nav>
          )}
        </div>
      </header>
    </>
  );
}

export default Navlinks;
