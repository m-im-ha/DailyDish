import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../ui/Loading";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaCalendarAlt, FaMapMarkerAlt, FaUser } from "react-icons/fa";

function Myfoodrequest() {
  const navigate = useNavigate();

  const {
    data: foods,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["myRequestedFoods"],
    queryFn: async () => {
      const response = await axios.get(
        "https://dailydishserver.vercel.app/foods/myrequestedfoods",
        { withCredentials: true },
      );
      return response.data;
    },
  });

  // Handle Errors
  if (isError) {
    if (error.response?.status === 401) {
      Swal.fire({
        icon: "error",
        title: "Unauthorized! Please log in again.",
        text: "Please try again later",
      });
      navigate("/login");
    } else {
      Swal.fire({
        icon: "error",
        title: "Failed to load your requested foods.",
        text: "Please try again later",
      });
    }
  }

  // Loading State
  if (isLoading) {
    return (
      <div className="text-center text-white">
        <Loading />
      </div>
    );
  }

  // No Foods Requested
  if (foods?.length === 0) {
    return (
      <div className="mt-10 text-center text-lg text-gray-400">
        No food requests found!
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="mb-8 text-center text-4xl font-extrabold text-amber-800">
        My Food Requests
      </h2>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {foods.map((food) => (
          <div
            key={food._id}
            className="group overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
          >
            <div className="relative h-64 overflow-hidden">
              <img
                className="h-full w-full transform object-cover transition-transform duration-700 group-hover:scale-110"
                src={food.foodImage}
                alt={food.foodName}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
            <div className="relative z-10 -mt-16 p-6">
              <div className="rounded-xl bg-white p-6 shadow-lg transition-all duration-300 group-hover:shadow-xl">
                <h3 className="mb-4 truncate text-2xl font-bold text-amber-800">
                  {food.foodName}
                </h3>

                <p className="mb-3 flex items-center text-lg text-gray-700">
                  <FaUser className="mr-2 text-blue-500" />
                  <span className="truncate font-medium">
                    Donator: {food.donatorName}
                  </span>
                </p>

                <p className="mb-3 flex items-center text-lg text-gray-700">
                  <FaMapMarkerAlt className="mr-2 text-yellow-500" />
                  {food.pickupLocation}
                </p>

                <p className="mb-3 flex items-center text-lg text-gray-700">
                  <FaCalendarAlt className="mr-2 text-red-500" />
                  Expiry: {new Date(food.expiredDate).toDateString()}
                </p>

                <p className="flex items-center text-lg text-gray-700">
                  <FaCalendarAlt className="mr-2 text-green-500" />
                  Requested: {new Date(food.requestDate).toDateString()}
                </p>

                <p className="mt-4 text-lg font-semibold text-gray-700">
                  Status: <span className="text-green-500">Requested</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Myfoodrequest;
