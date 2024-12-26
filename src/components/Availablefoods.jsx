import axios from "axios";
import { useEffect, useState } from "react";
import FoodCard from "./FoodCard";
import { FaSearch } from "react-icons/fa";

function Availablefoods() {
  const [availablefoods, setAvailablefoods] = useState([]);
  const [sortKey, setSortKey] = useState("foodPrice");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [isThreeColumn, setIsThreeColumn] = useState(true);

  // Fetch Data
  useEffect(() => {
    async function fetchAvailablefoods() {
      try {
        const response = await axios.get(
          `https://dailydishserver.vercel.app/foods/availablefoods`,
        );
        setAvailablefoods(response.data);
        setFilteredFoods(response.data);
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchAvailablefoods();
  }, []);

  // Sort and Filter Combined
  useEffect(() => {
    let foods = [...availablefoods];

    // Apply Filter (Search)
    foods = foods.filter((food) =>
      food?.foodName?.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    // Sorting
    foods.sort((a, b) => {
      if (sortKey === "expiredDate") {
        return new Date(a[sortKey]) - new Date(b[sortKey]);
      }
      return a[sortKey] - b[sortKey];
    });

    setFilteredFoods(foods);
  }, [availablefoods, searchQuery, sortKey]);

  return (
    <div>
      {/* Search Input */}
      <div className="mx-auto mb-12 max-w-md">
        <div className="relative">
          <input
            type="text"
            placeholder="Search foods..."
            className="w-full rounded-full border-2 border-blue-200 py-3 pl-12 pr-4 text-gray-700 shadow-lg transition duration-300 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Sorting and Layout Buttons */}
      <div className="mb-5 flex justify-between">
        <div className="flex gap-4">
          {/* Sort by Price */}
          <button
            onClick={() => setSortKey("foodPrice")}
            className={`rounded-lg px-4 py-2 text-black transition duration-300 ${
              sortKey === "foodPrice"
                ? "bg-green-600 text-white shadow-lg"
                : "bg-green-200 hover:bg-green-500"
            }`}
          >
            Sort by Price
          </button>

          {/* Sort by Expired Date */}
          <button
            onClick={() => setSortKey("expiredDate")}
            className={`rounded-lg px-4 py-2 text-black transition duration-300 ${
              sortKey === "expiredDate"
                ? "bg-yellow-600 text-white shadow-lg"
                : "bg-yellow-200 hover:bg-yellow-500"
            }`}
          >
            Sort by Expired Date
          </button>
        </div>

        {/* Layout Toggle Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => setIsThreeColumn(true)}
            className={`rounded-lg px-4 py-2 transition duration-300 ${
              isThreeColumn
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-blue-200 hover:bg-blue-500"
            }`}
          >
            3-Column
          </button>

          <button
            onClick={() => setIsThreeColumn(false)}
            className={`rounded-lg px-4 py-2 transition duration-300 ${
              !isThreeColumn
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-blue-200 hover:bg-blue-500"
            }`}
          >
            2-Column
          </button>
        </div>
      </div>

      {/* Food Cards */}
      <div
        className={`grid gap-5 ${
          isThreeColumn ? "grid-cols-3" : "grid-cols-2"
        }`}
      >
        {filteredFoods.length > 0 ? (
          filteredFoods.map(
            (food) =>
              food.foodStatus === "available" && (
                <div key={food._id}>
                  <FoodCard food={food} />
                </div>
              ),
          )
        ) : (
          <div className="col-span-full py-10 text-center">
            <p className="text-xl text-gray-500">
              No foods found for "{searchQuery}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Availablefoods;
