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
        "http://localhost:5000/foods/myrequestedfoods",
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
      <h2 className="mb-6 text-center text-3xl font-bold text-pink-400">
        My Food Requests
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {foods.map((food) => (
          <div
            key={food._id}
            className="overflow-hidden rounded-xl bg-gray-800 text-gray-200 shadow-lg"
          >
            <img
              className="h-48 w-full object-cover"
              src={food.foodImage}
              alt={food.foodName}
            />
            <div className="p-6">
              <h3 className="mb-2 text-2xl font-bold text-pink-400">
                {food.foodName}
              </h3>

              {/* Donator's Name */}
              <p className="mb-2 flex items-center text-lg">
                <FaUser className="mr-2 text-blue-400" />
                <span className="font-semibold">
                  Donator: {food.donatorName}
                </span>
              </p>

              {/* Pickup Location */}
              <p className="mb-2 flex items-center text-lg">
                <FaMapMarkerAlt className="mr-2 text-yellow-400" />
                Pickup: {food.pickupLocation}
              </p>

              {/* Expire Date */}
              <p className="mb-2 flex items-center text-lg">
                <FaCalendarAlt className="mr-2 text-red-400" />
                Expiry: {new Date(food.expiredDate).toDateString()}
              </p>

              {/* Request Date */}
              <p className="mb-2 flex items-center text-lg">
                <FaCalendarAlt className="mr-2 text-green-400" />
                Requested: {new Date(food.requestDate).toDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Myfoodrequest;
