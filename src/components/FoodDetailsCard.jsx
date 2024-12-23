import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../ui/Loading";
import { FoodContext } from "../provider/Foodprovider";
import { FaCalendarAlt, FaDollarSign, FaMapMarkerAlt } from "react-icons/fa";

function FoodDetailsCard() {
  const { id } = useParams();
  const [food, setFood] = useState(null);
  const { loading, setLoading } = useContext(FoodContext);

  useEffect(() => {
    async function fetchFoodDetails() {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/foods/foodDetails/${id}`,
        );
        setFood(response.data);
      } catch (error) {
        console.error("Error fetching food details:", error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchFoodDetails();
  }, [id, setLoading]);

  // Loading if the context loading state is true
  if (loading || !food) {
    return (
      <div className="text-center text-white">
        <Loading />
      </div>
    );
  }

  return (
    <div className="max-w-sm overflow-hidden rounded-xl bg-gray-800 text-gray-200 shadow-lg">
      <img
        className="h-48 w-full object-cover"
        src={food.foodImage}
        alt={food.foodName}
      />
      <div className="p-6">
        {/* Food Name */}
        <h3 className="mb-2 text-2xl font-bold text-pink-400">
          {food.foodName}
        </h3>

        {/* Food Price */}
        <p className="mb-2 flex items-center text-lg">
          <FaDollarSign className="mr-2 text-green-400" />
          <span className="font-semibold">${food.foodPrice}</span>
        </p>

        {/* Food Quantity */}
        <p className="mb-2 text-lg">
          <span className="font-semibold">Quantity:</span> {food.foodQuantity}
        </p>

        {/* Pickup Location */}
        <p className="mb-2 flex items-center text-lg">
          <FaMapMarkerAlt className="mr-2 text-yellow-400" />
          {food.pickupLocation}
        </p>

        {/* Expired Date */}
        <p className="mb-2 flex items-center text-lg">
          <FaCalendarAlt className="mr-2 text-green-400" />
          {new Date(food.expiredDate).toDateString()}
        </p>

        {/* Food Status */}
        <p className="mb-4 text-lg font-semibold">Status: {food.foodStatus}</p>

        {/* Additional Notes */}
        <p className="mb-4 text-sm text-gray-400">
          <span className="font-semibold text-white">Notes:</span>{" "}
          {food.additionalNotes}
        </p>

        {/* Details Button */}
        <button className="w-full rounded-lg bg-pink-500 px-4 py-2 font-bold text-white hover:bg-pink-600">
          Request This Food
        </button>
      </div>
    </div>
  );
}

export default FoodDetailsCard;
