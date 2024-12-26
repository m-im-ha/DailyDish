import { useEffect, useState } from "react";
import axios from "axios";
import { FaMapMarkerAlt, FaUtensils, FaDollarSign } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Loading from "../ui/Loading";

function FeaturedFoods() {
  const [featuredFoods, setFeaturedFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchFeaturedFoods() {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://dailydishserver.vercel.app/foods/featuredfoods",
        );
        setFeaturedFoods(response.data);
      } catch (error) {
        console.error("Error fetching featured foods:", error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchFeaturedFoods();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="mb-6 text-center text-3xl font-bold text-pink-400">
        Featured Foods
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {featuredFoods.map((food) => (
          <div
            key={food._id}
            className="rounded-lg border border-gray-700 bg-gray-800 p-4 shadow-lg transition hover:scale-105 hover:shadow-xl"
          >
            <img
              src={food.foodImage}
              alt={food.foodName}
              className="mb-4 h-40 w-full rounded-lg object-cover"
            />
            <h3 className="mb-2 text-xl font-bold text-pink-400">
              {food.foodName}
            </h3>
            <p className="mb-2 flex items-center text-gray-300">
              <FaUtensils className="mr-2 text-yellow-400" />
              Quantity: {food.foodQuantity}
            </p>
            <p className="mb-2 flex items-center text-gray-300">
              <FaDollarSign className="mr-2 text-green-400" />
              Price: ${food.foodPrice}
            </p>
            <p className="mb-2 flex items-center text-gray-300">
              <FaMapMarkerAlt className="mr-2 text-blue-400" />
              {food.pickupLocation}
            </p>
            <button
              onClick={() => navigate(`/food/${food._id}`)}
              className="mt-4 w-full rounded-lg bg-pink-500 px-4 py-2 font-bold text-white hover:bg-pink-600"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeaturedFoods;
