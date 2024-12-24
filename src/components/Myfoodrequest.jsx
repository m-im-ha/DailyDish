import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../ui/Loading";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Myfoodrequest() {
  const navigate = useNavigate();

  const { data: foods, isLoading, isError, error } = useQuery({
    queryKey: ["myRequestedFoods"],
    queryFn: async () => {
      const response = await axios.get(
        "http://localhost:5000/foods/myrequestedfoods",
        { withCredentials: true }
      );
      return response.data;
    },
  });

  // Handle Errors
  if (isError) {
    if (error.response?.status === 401) {
      Swal.fire("Unauthorized!", "Please login again.", "error");
      navigate("/login");
    } else {
      Swal.fire("Oops!", "Failed to load your requested foods.", "error");
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
      <div className="text-center mt-10 text-lg text-gray-400">
        No food requests found!
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="mb-6 text-3xl font-bold text-pink-500 text-center">
        My Food Requests
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {foods.map((food) => (
          <div
            key={food._id}
            className="max-w-sm overflow-hidden rounded-lg bg-gray-800 text-gray-200 shadow-lg"
          >
            <img
              src={food.foodImage}
              alt={food.foodName}
              className="h-48 w-full object-cover"
            />
            <div className="p-6">
              <h3 className="mb-2 text-2xl font-bold text-pink-400">
                {food.foodName}
              </h3>
              <p className="mb-2 text-lg">
                <span className="font-semibold">Pickup Location:</span>{" "}
                {food.pickupLocation}
              </p>
              <p className="mb-2 text-lg">
                <span className="font-semibold">Request Date:</span>{" "}
                {new Date(food.requestDate).toDateString()}
              </p>
              <p className="mb-2 text-lg">
                <span className="font-semibold">Expire Date:</span>{" "}
                {new Date(food.expiredDate).toDateString()}
              </p>
              <p className="mb-4 text-lg font-semibold">
                Status: {food.foodStatus}
              </p>
              <p className="mb-4 text-sm text-gray-400">
                <span className="font-semibold text-white">Notes:</span>{" "}
                {food.additionalNotes}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Myfoodrequest;
