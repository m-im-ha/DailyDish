import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../ui/Loading";
import { FaCalendarAlt, FaDollarSign, FaMapMarkerAlt, FaUtensils, FaUser, FaEnvelope } from "react-icons/fa";
import Swal from "sweetalert2";
import FoodContext from "../provider/FoodContext";

function FoodDetailsCard() {
  const { id } = useParams();
  const { user } = useContext(FoodContext);
  const navigate = useNavigate();

  const [food, setFood] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notes, setNotes] = useState("");

   // Fetch Food Details
   useEffect(() => {
    const fetchFoodDetails = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://dailydishserver.vercel.app/foods/foodDetails/${id}`,
          {
            withCredentials: true,
          },
        );
        setFood(response.data);
      } catch (error) {
        console.error("Error:", error);
        if (error.response?.status === 401) {
          navigate("/login");
        } else {
          Swal.fire({
            icon: "error",
            title: "Error loading food details",
            text: error.response?.data?.message || "Please try again later",
          });
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchFoodDetails();
  }, [id, navigate]);

  // Handle Food Request
  async function handleRequestFood() {
    try {
      const requestData = {
        foodId: food._id,
        foodName: food.foodName,
        foodImage: food.foodImage,
        donatorEmail: food.donator.email,
        donatorName: food.donator.name,
        userEmail: user.email,
        requestDate: new Date().toISOString(),
        pickupLocation: food.pickupLocation,
        expiredDate: food.expiredDate,
        additionalNotes: notes,
        foodStatus: "requested",
      };

      // Add food to requested foods
      await axios.post(
        "https://dailydishserver.vercel.app/foods/requestedfoods",
        requestData,
        { withCredentials: true },
      );

      // Remove food from available foods
      await axios.delete(
        `https://dailydishserver.vercel.app/foods/delete/${food._id}`,
        {
          withCredentials: true,
        },
      );

      setIsModalOpen(false);
      Swal.fire({
        title: "Food requested successfully!",
        icon: "success",
        confirmButtonColor: "Ok",
      });

      navigate("/myfoodrequest");
    } catch (error) {
      console.error("Error requesting food:", error.message);
      Swal.fire({
        icon: "error",
        title: "Failed to request food.",
        text: "Please try again later",
      });
    }
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="mx-auto max-w-4xl p-4">
      <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl">
        {/* Image Container */}
        <div className="relative h-96 overflow-hidden">
          <img
            src={food.foodImage}
            alt={food.foodName}
            className="h-full w-full transform object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 -mt-20 p-6">
          <div className="rounded-xl bg-white p-8 shadow-lg transition-all duration-300 group-hover:shadow-xl">
            {/* Title */}
            <h3 className="mb-6 text-3xl font-bold text-amber-800">
              {food.foodName}
            </h3>

            {/* Info Grid */}
            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="flex items-center space-x-3">
                <div className="rounded-full bg-amber-100 p-3">
                  <FaUtensils className="text-xl text-amber-600" />
                </div>
                <span className="text-lg font-medium text-gray-700">
                  Quantity: {food.foodQuantity}
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <div className="rounded-full bg-amber-100 p-3">
                  <FaDollarSign className="text-xl text-amber-600" />
                </div>
                <span className="text-lg font-medium text-gray-700">
                  Price: ${food.foodPrice}
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <div className="rounded-full bg-amber-100 p-3">
                  <FaMapMarkerAlt className="text-xl text-amber-600" />
                </div>
                <span className="text-lg font-medium text-gray-700">
                  {food.pickupLocation}
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <div className="rounded-full bg-amber-100 p-3">
                  <FaCalendarAlt className="text-xl text-amber-600" />
                </div>
                <span className="text-lg font-medium text-gray-700">
                  Expires: {new Date(food.expiredDate).toDateString()}
                </span>
              </div>
            </div>

            {/* Donator Info */}
            <div className="mb-8 rounded-lg bg-amber-50 p-6">
              <h4 className="mb-4 text-xl font-bold text-amber-800">Donator Information</h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <FaUser className="text-xl text-amber-600" />
                  <span className="text-lg font-medium text-gray-700">{food.donator.name}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaEnvelope className="text-xl text-amber-600" />
                  <span className="text-lg font-medium text-gray-700">{food.donator.email}</span>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="mb-8">
              <h4 className="mb-2 text-xl font-bold text-amber-800">Additional Notes</h4>
              <p className="text-lg text-gray-600">{food.additionalNotes || "No additional notes provided."}</p>
            </div>

            {/* Request Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="group relative w-full overflow-hidden rounded-full bg-gradient-to-r from-amber-500 to-amber-700 px-8 py-4 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:shadow-amber-300/30"
            >
              <span className="relative z-10 flex items-center justify-center">
                Request This Food
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-2 h-6 w-6 transform transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
              <div className="absolute inset-0 -translate-x-full transform bg-gradient-to-r from-amber-600 to-amber-800 transition-transform duration-300 group-hover:translate-x-0"></div>
            </button>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-amber-400/10 blur-2xl transition-all duration-300 group-hover:bg-amber-400/20"></div>
        <div className="absolute -bottom-12 -left-12 h-32 w-32 rounded-full bg-amber-400/10 blur-2xl transition-all duration-300 group-hover:bg-amber-400/20"></div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="mb-6 text-center text-2xl font-bold text-amber-800">
              Request Food
            </h3>
            
            <div className="space-y-4">
              <div className="rounded-lg bg-amber-50 p-4">
                <img
                  src={food.foodImage}
                  alt={food.foodName}
                  className="mb-4 h-48 w-full rounded-lg object-cover"
                />
                <h4 className="mb-2 text-xl font-bold text-amber-800">{food.foodName}</h4>
                <p className="text-gray-600">ID: {food._id}</p>
              </div>

              <div className="space-y-3 rounded-lg bg-amber-50 p-4">
                <p className="font-medium text-gray-700">
                  <span className="font-bold text-amber-800">Donator:</span> {food.donator.name}
                </p>
                <p className="font-medium text-gray-700">
                  <span className="font-bold text-amber-800">Email:</span> {food.donator.email}
                </p>
                <p className="font-medium text-gray-700">
                  <span className="font-bold text-amber-800">Your Email:</span> {user.email}
                </p>
                <p className="font-medium text-gray-700">
                  <span className="font-bold text-amber-800">Request Date:</span> {new Date().toDateString()}
                </p>
                <p className="font-medium text-gray-700">
                  <span className="font-bold text-amber-800">Pickup:</span> {food.pickupLocation}
                </p>
                <p className="font-medium text-gray-700">
                  <span className="font-bold text-amber-800">Expires:</span> {new Date(food.expiredDate).toDateString()}
                </p>
              </div>

              <textarea
                placeholder="Additional Notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full rounded-lg border border-amber-200 bg-white p-4 text-gray-700 focus:border-amber-500 focus:outline-none"
                rows="4"
              />

              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-full bg-gray-200 px-6 py-3 font-bold text-gray-700 transition-all hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRequestFood}
                  className="rounded-full bg-gradient-to-r from-amber-500 to-amber-700 px-6 py-3 font-bold text-white transition-all hover:from-amber-600 hover:to-amber-800"
                >
                  Confirm Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FoodDetailsCard;