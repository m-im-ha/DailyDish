import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../ui/Loading";
import { FaCalendarAlt, FaDollarSign, FaMapMarkerAlt } from "react-icons/fa";
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
    <div className="max-w-sm overflow-hidden rounded-xl bg-gray-800 text-gray-200 shadow-lg">
      <img
        className="h-48 w-full object-cover"
        src={food.foodImage}
        alt={food.foodName}
      />
      <div className="p-6">
        <h3 className="mb-2 text-2xl font-bold text-pink-400">
          {food.foodName}
        </h3>

        <p className="mb-2 flex items-center text-lg">
          <FaDollarSign className="mr-2 text-green-400" />
          <span className="font-semibold">${food.foodPrice}</span>
        </p>

        <p className="mb-2 text-lg">
          <span className="font-semibold">Quantity:</span> {food.foodQuantity}
        </p>

        <p className="mb-2 flex items-center text-lg">
          <FaMapMarkerAlt className="mr-2 text-yellow-400" />
          {food.pickupLocation}
        </p>

        <p className="mb-2 flex items-center text-lg">
          <FaCalendarAlt className="mr-2 text-green-400" />
          {new Date(food.expiredDate).toDateString()}
        </p>

        <p className="mb-4 text-lg font-semibold">Status: {food.foodStatus}</p>

        <p className="mb-4 text-sm text-gray-400">
          <span className="font-semibold text-white">Notes:</span>{" "}
          {food.additionalNotes}
        </p>

        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full rounded-lg bg-pink-500 px-4 py-2 font-bold text-white hover:bg-pink-600"
        >
          Request This Food
        </button>

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-96 rounded-lg bg-gray-800 p-6 shadow-lg">
              <h3 className="mb-4 text-center text-lg font-bold">
                Request Food
              </h3>
              <p>
                <strong>Food Name:</strong> {food.foodName}
              </p>
              <p>
                <strong>Food Image:</strong>{" "}
                <img
                  src={food.foodImage}
                  alt={food.foodName}
                  className="h-40 w-40 rounded-lg object-cover"
                />
              </p>
              <p>
                <strong>Food ID:</strong> {food._id}
              </p>
              <p>
                <strong>Donator Name:</strong> {food.donator.name}
              </p>
              <p>
                <strong>Donator Email:</strong> {food.donator.email}
              </p>
              <p>
                <strong>User Email:</strong> {user.email}
              </p>
              <p>
                <strong>Request Date:</strong> {new Date().toDateString()}
              </p>
              <p>
                <strong>Pickup Location:</strong> {food.pickupLocation}
              </p>
              <p>
                <strong>Expire Date:</strong>{" "}
                {new Date(food.expiredDate).toDateString()}
              </p>
              <textarea
                placeholder="Additional Notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full rounded-lg border border-gray-600 bg-gray-700 p-2 text-white"
              />
              <div className="mt-4 flex justify-end gap-2">
                <button
                  onClick={handleRequestFood}
                  className="rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                >
                  Request
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FoodDetailsCard;
