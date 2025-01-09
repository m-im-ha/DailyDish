import { NavLink, useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { FiMenu, FiX, FiUser, FiLogOut } from "react-icons/fi";
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
   if (location.pathname === targetPath) {
     setLoading(false);
   } else {
     setLoading(true);
   }
   setIsMenuOpen(false);
 };

 const mainNavLinks = [
   { to: "/", label: "Home" },
   { to: "/availablefoods", label: "Available Foods" },
 ];

 return (
   <>
     {loading && <Loading />}
     <header className="fixed left-0 right-0 top-0 z-50 w-full bg-amber-100">
       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-5">
         <div className="flex items-center justify-between py-2">
           {/* Logo */}
           <div className="text-3xl font-extrabold tracking-wide">
             <NavLink
               to="/"
               onClick={() => handleNavigation("/")}
               className="text-amber-800 transition-all hover:text-amber-700"
             >
               Daily
               <span className="text-amber-600">Dish</span>
             </NavLink>
           </div>

           {/* Desktop Navigation */}
           <nav className="hidden items-center gap-8 lg:flex">
             {mainNavLinks.map((link) => (
               <NavLink
                 key={link.to}
                 to={link.to}
                 className="text-amber-800 relative group hover:text-amber-600"
                 onClick={() => handleNavigation(link.to)}
               >
                 {link.label}
                 <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
               </NavLink>
             ))}

             {/* Dashboard Dropdown */}
             {user && (
               <div className="relative group">
                 <button className="text-amber-800 relative group flex items-center gap-1 hover:text-amber-600">
                   Dashboard
                   <svg
                     xmlns="http://www.w3.org/2000/svg"
                     className="h-4 w-4 transition-transform group-hover:rotate-180"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor"
                   >
                     <path
                       strokeLinecap="round"
                       strokeLinejoin="round"
                       strokeWidth={2}
                       d="M19 9l-7 7-7-7"
                     />
                   </svg>
                   <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
                 </button>

                 <div className="absolute left-0 top-full mt-2 w-48 rounded-xl border border-amber-200 bg-white opacity-0 shadow-xl transition-all duration-300 invisible group-hover:opacity-100 group-hover:visible">
                   <div className="py-2">
                     <NavLink
                       to="/addfood"
                       className="block px-4 py-2 text-sm text-amber-800 hover:bg-amber-50"
                       onClick={() => handleNavigation("/addfood")}
                     >
                       Add Food
                     </NavLink>
                     <NavLink
                       to="/managemyfoods"
                       className="block px-4 py-2 text-sm text-amber-800 hover:bg-amber-50"
                       onClick={() => handleNavigation("/managemyfoods")}
                     >
                       Manage My Foods
                     </NavLink>
                     <NavLink
                       to="/myfoodrequest"
                       className="block px-4 py-2 text-sm text-amber-800 hover:bg-amber-50"
                       onClick={() => handleNavigation("/myfoodrequest")}
                     >
                       My Food Request
                     </NavLink>
                   </div>
                 </div>
               </div>
             )}

             {/* User Profile */}
             {user ? (
               <div className="relative group">
                 <div className="cursor-pointer">
                   <img
                     className="h-10 w-10 rounded-full border-2 border-amber-500 transition-all group-hover:border-amber-600"
                     src={user.photoURL}
                     title={user.displayName || "User"}
                     alt="User Profile"
                   />
                 </div>

                 <div className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-amber-200 bg-white opacity-0 shadow-xl transition-all duration-300 invisible group-hover:opacity-100 group-hover:visible">
                   <div className="py-2">
                     <button
                       onClick={handleLogout}
                       className="w-full flex items-center gap-2 px-4 py-2 text-sm text-amber-800 hover:bg-amber-50"
                     >
                       <FiLogOut className="h-4 w-4" />
                       Logout
                     </button>
                   </div>
                 </div>
               </div>
             ) : (
               <div className="flex gap-4">
                 <NavLink
                   to="/register"
                   className="rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-2 text-sm font-medium text-white hover:from-amber-600 hover:to-amber-700"
                 >
                   Register
                 </NavLink>
                 <NavLink
                   to="/login"
                   className="rounded-lg bg-gradient-to-r from-amber-600 to-amber-700 px-4 py-2 text-sm font-medium text-white hover:from-amber-700 hover:to-amber-800"
                 >
                   Login
                 </NavLink>
               </div>
             )}
           </nav>

           {/* Mobile Menu Toggle */}
           <button
             className="text-3xl text-amber-800 focus:outline-none lg:hidden"
             onClick={() => setIsMenuOpen(!isMenuOpen)}
           >
             {isMenuOpen ? <FiX /> : <FiMenu />}
           </button>
         </div>

         {/* Mobile Navigation */}
         {isMenuOpen && (
           <nav className="flex flex-col items-start gap-6 border-t border-amber-200 pb-6 lg:hidden">
             {mainNavLinks.map((link) => (
               <NavLink
                 key={link.to}
                 to={link.to}
                 className="text-amber-800 relative group hover:text-amber-600"
                 onClick={() => handleNavigation(link.to)}
               >
                 {link.label}
                 <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
               </NavLink>
             ))}

             {user && (
               <>
                 <div className="my-2 w-full border-t border-amber-200"></div>
                 <span className="text-sm font-semibold text-amber-600">
                   Dashboard
                 </span>
                 <NavLink
                   to="/addfood"
                   className="pl-4 text-amber-800 relative group hover:text-amber-600"
                   onClick={() => handleNavigation("/addfood")}
                 >
                   Add Food
                 </NavLink>
                 <NavLink
                   to="/managemyfoods"
                   className="pl-4 text-amber-800 relative group hover:text-amber-600"
                   onClick={() => handleNavigation("/managemyfoods")}
                 >
                   Manage My Foods
                 </NavLink>
                 <NavLink
                   to="/myfoodrequest"
                   className="pl-4 text-amber-800 relative group hover:text-amber-600"
                   onClick={() => handleNavigation("/myfoodrequest")}
                 >
                   My Food Request
                 </NavLink>

                 <div className="my-2 w-full border-t border-amber-200"></div>
                 <div className="flex items-center gap-2">
                   <img
                     className="h-8 w-8 rounded-full border-2 border-amber-500"
                     src={user.photoURL}
                     alt="User Profile"
                   />
                 </div>
                 <button
                   onClick={handleLogout}
                   className="flex items-center gap-2 text-amber-800 hover:text-amber-600"
                 >
                   <FiLogOut className="h-5 w-5" />
                   <span>Logout</span>
                 </button>
               </>
             )}

             {!user && (
               <div className="flex flex-col gap-2 w-full">
                 <NavLink
                   to="/register"
                   className="rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-2 text-sm font-medium text-white text-center"
                 >
                   Register
                 </NavLink>
                 <NavLink
                   to="/login"
                   className="rounded-lg bg-gradient-to-r from-amber-600 to-amber-700 px-4 py-2 text-sm font-medium text-white text-center"
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