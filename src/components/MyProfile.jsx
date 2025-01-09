import { useContext } from "react";
import FoodContext from "../provider/FoodContext";
import { FiMail, FiUser } from "react-icons/fi";

function MyProfile() {
 const { user } = useContext(FoodContext);

 return (
   <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-50 px-4 py-20">
     <div className="container mx-auto max-w-2xl">
       <div className="overflow-hidden rounded-2xl border border-amber-200/50 bg-white/80 shadow-xl backdrop-blur-sm">
         {/* Profile Header */}
         <div className="relative h-32 bg-gradient-to-r from-amber-500 to-amber-700">
           {/* Profile Image */}
           <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 transform">
             <div className="relative inline-block rounded-full ring-4 ring-amber-500">
               <img
                 src={user?.photoURL}
                 alt={user?.displayName || "User"}
                 className="h-24 w-24 rounded-full border-4 border-white object-cover"
               />
             </div>
           </div>
         </div>

         {/* Profile Info */}
         <div className="px-6 pt-16 pb-8">
           <div className="mb-6 text-center">
             <h1 className="mb-1 font-playfair text-2xl font-bold text-amber-800">
               {user?.displayName}
             </h1>
             <p className="text-sm text-amber-600">
               Your Profile
             </p>
           </div>

           {/* User Details */}
           <div className="space-y-4">
             {/* Name */}
             <div className="flex items-center gap-3 rounded-lg bg-amber-50 p-3">
               <FiUser className="text-amber-600" />
               <div>
                 <p className="mb-1 text-xs text-amber-600">
                   Full Name
                 </p>
                 <p className="font-medium text-amber-800">
                   {user?.displayName || "Not provided"}
                 </p>
               </div>
             </div>

             {/* Email */}
             <div className="flex items-center gap-3 rounded-lg bg-amber-50 p-3">
               <FiMail className="text-amber-600" />
               <div>
                 <p className="mb-1 text-xs text-amber-600">
                   Email Address
                 </p>
                 <p className="font-medium text-amber-800">
                   {user?.email}
                 </p>
               </div>
             </div>
           </div>
         </div>
       </div>
     </div>
   </div>
 );
}

export default MyProfile;