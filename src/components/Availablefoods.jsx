import axios from "axios";
import { useEffect, useState } from "react";
import FoodCard from "./FoodCard";

function Availablefoods() {
  const [availablefoods, setAvailablefoods] = useState([]);
  const [sortKey, setSortKey] = useState("foodPrice");

  useEffect(() => {
    async function fetchAvailablefoods() {
      try {
        const response = await axios.get(
          `http://localhost:5000/foods/availablefoods`,
        );
        setAvailablefoods(response.data);
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchAvailablefoods();
  }, []);

  // Sorting Function
  const sortedFoods = [...availablefoods].sort((a, b) => {
    if (sortKey === "expiredDate") {
      // console.log(sortKey,a.foodPrice,b.foodPrice);
      return new Date(a[sortKey]) - new Date(b[sortKey]);
    }
    return a[sortKey] - b[sortKey];
  });

  return (
    <div>
      {/* Sorting Options */}
      <div className="mb-5 flex justify-end gap-4">
        <button
          onClick={() => setSortKey("foodPrice")}
          className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white"
        >
          Sort by Price
        </button>
        <button
          onClick={() => setSortKey("expiredDate")}
          className="px-4 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white"
        >
          Sort by Expired Date
        </button>
      </div>

      {/* Food Cards */}
      <div className="grid grid-cols-3 gap-5">
        {sortedFoods?.map(
          (food) =>
            food.foodStatus === "available" && (
              <div key={food._id}>
                <FoodCard food={food} />
              </div>
            )
        )}
      </div>
    </div>
  );
}

export default Availablefoods;
