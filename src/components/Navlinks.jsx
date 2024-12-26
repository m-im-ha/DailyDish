import { NavLink, useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import FoodContext from "../provider/FoodContext";
import Loading from "../ui/Loading";

function Navlinks() {
  const { user, setUser, logOut, loading, setLoading } = useContext(FoodContext);
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
      <header className="bg-gradient-to-r from-amber-50 to-amber-100 sticky top-0 z-50">
        <div className="sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-4xl font-extrabold">
              <NavLink
                to="/"
                onClick={() => handleNavigation("/")}
                className="bg-gradient-to-r from-amber-800 to-yellow-600 bg-clip-text text-transparent hover:from-yellow-600 hover:to-amber-800 transition-all duration-300"
              >
                Daily<span className="text-amber-800">Dish</span>
              </NavLink>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {[{ to: "/", label: "Home" },
                { to: "/availablefoods", label: "Available Foods" },
                { to: "/addfood", label: "Add Food" },
                { to: "/managemyfoods", label: "Manage My Foods" },
                { to: "/myfoodrequest", label: "My Food Request" },
              ].map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `relative px-3 py-2 text-lg font-medium transition-all duration-300 ${
                      isActive
                        ? "text-amber-800"
                        : "text-gray-600 hover:text-amber-800"
                    }`
                  }
                  onClick={() => handleNavigation(link.to)}
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-800 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                </NavLink>
              ))}
              {user ? (
                <div className="flex items-center gap-4">
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 rounded-full bg-gradient-to-r from-amber-600 to-amber-800 text-white font-medium hover:from-amber-700 hover:to-amber-900 transition-all duration-300"
                  >
                    LogOut
                  </button>
                  <div className="relative group">
                    <img
                      className="h-12 w-12 rounded-full ring-2 ring-amber-600 group-hover:ring-amber-800 transition-all duration-300 object-cover"
                      src={user.photoURL}
                      title={user.displayName || "User"}
                      alt="User Profile"
                    />
                  </div>
                </div>
              ) : (
                <div className="flex gap-4">
                  <NavLink
                    to="/register"
                    className="px-6 py-2 rounded-full bg-gradient-to-r from-amber-600 to-amber-800 text-white font-medium hover:from-amber-700 hover:to-amber-900 transition-all duration-300"
                  >
                    Register
                  </NavLink>
                  <NavLink
                    to="/login"
                    className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-600 to-purple-800 text-white font-medium hover:from-purple-700 hover:to-purple-900 transition-all duration-300"
                  >
                    Login
                  </NavLink>
                </div>
              )}
            </nav>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden text-3xl text-amber-800 focus:outline-none transition-transform duration-300 hover:scale-110"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="lg:hidden bg-gradient-to-b from-amber-50 to-amber-100 flex flex-col gap-4 py-6 px-4 border-t border-amber-200">
              {[{ to: "/", label: "Home" },
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
                    } hover:text-amber-800 transition-all duration-300`
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
                    className="px-4 py-2 rounded-full bg-gradient-to-r from-amber-600 to-amber-800 text-white font-medium hover:from-amber-700 hover:to-amber-900 transition-all duration-300"
                  >
                    LogOut
                  </button>
                  <div className="relative group">
                    <img
                      className="h-10 w-10 rounded-full ring-2 ring-amber-600 group-hover:ring-amber-800 transition-all duration-300 object-cover"
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
                    className="px-6 py-2 rounded-full bg-gradient-to-r from-amber-600 to-amber-800 text-white font-medium hover:from-amber-700 hover:to-amber-900 transition-all duration-300 text-center"
                  >
                    Register
                  </NavLink>
                  <NavLink
                    to="/login"
                    className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-600 to-purple-800 text-white font-medium hover:from-purple-700 hover:to-purple-900 transition-all duration-300 text-center"
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
