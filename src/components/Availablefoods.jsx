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

  useEffect(() => {
    let foods = [...availablefoods];
    foods = foods.filter((food) =>
      food?.foodName?.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    foods.sort((a, b) => {
      if (sortKey === "expiredDate") {
        return new Date(a[sortKey]) - new Date(b[sortKey]);
      }
      return a[sortKey] - b[sortKey];
    });
    setFilteredFoods(foods);
  }, [availablefoods, searchQuery, sortKey]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="container mx-auto">
    
        <div className="mb-16 text-center">
          <h1 className="font-playfair relative inline-block text-4xl font-black tracking-tight text-amber-800 md:text-5xl">
            <span className="relative z-10">Available Foods</span>
            <div className="absolute -bottom-2 left-0 h-3 w-full bg-amber-200/60"></div>
          </h1>
          <p className="font-lato mt-4 text-lg text-amber-700">Discover delicious meals waiting for you</p>
        </div>

        {/* Search Section */}
        <div className="mx-auto mb-12 max-w-2xl">
          <div className="relative">
            <input
              type="text"
              placeholder="Search foods..."
              className="w-full rounded-full border-2 border-amber-200 bg-white py-4 pl-14 pr-6 text-lg text-gray-700 shadow-lg transition-all duration-300 placeholder:text-amber-500 hover:border-amber-300 hover:shadow-amber-100 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-xl text-amber-400" />
          </div>
        </div>

        {/* Controls Section */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:justify-between">
          {/* Sort Buttons */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSortKey("foodPrice")}
              className={`group relative overflow-hidden rounded-full px-6 py-3 text-sm font-bold transition-all duration-300 sm:text-base ${
                sortKey === "foodPrice"
                  ? "bg-gradient-to-r from-amber-500 to-amber-700 text-white shadow-lg"
                  : "bg-white text-amber-700 hover:shadow-lg"
              }`}
            >
              <span className="relative z-10">Sort by Price</span>
              {sortKey !== "foodPrice" && (
                <div className="absolute inset-0 -translate-x-full transform bg-gradient-to-r from-amber-500 to-amber-700 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"></div>
              )}
            </button>

            <button
              onClick={() => setSortKey("expiredDate")}
              className={`group relative overflow-hidden rounded-full px-6 py-3 text-sm font-bold transition-all duration-300 sm:text-base ${
                sortKey === "expiredDate"
                  ? "bg-gradient-to-r from-amber-500 to-amber-700 text-white shadow-lg"
                  : "bg-white text-amber-700 hover:shadow-lg"
              }`}
            >
              <span className="relative z-10">Sort by Expired Date</span>
              {sortKey !== "expiredDate" && (
                <div className="absolute inset-0 -translate-x-full transform bg-gradient-to-r from-amber-500 to-amber-700 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"></div>
              )}
            </button>
          </div>

          {/* Layout Toggle */}
          <div className="flex gap-3">
            <button
              onClick={() => setIsThreeColumn(true)}
              className={`rounded-full px-6 py-3 text-sm font-bold transition-all duration-300 sm:text-base ${
                isThreeColumn
                  ? "bg-gradient-to-r from-amber-500 to-amber-700 text-white shadow-lg"
                  : "bg-white text-amber-700 hover:bg-amber-100"
              }`}
            >
              3-Column
            </button>

            <button
              onClick={() => setIsThreeColumn(false)}
              className={`rounded-full px-6 py-3 text-sm font-bold transition-all duration-300 sm:text-base ${
                !isThreeColumn
                  ? "bg-gradient-to-r from-amber-500 to-amber-700 text-white shadow-lg"
                  : "bg-white text-amber-700 hover:bg-amber-100"
              }`}
            >
              2-Column
            </button>
          </div>
        </div>

        {/* Food Cards Grid */}
        <div
          className={`grid gap-6 sm:gap-8 ${
            isThreeColumn
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1 md:grid-cols-2"
          }`}
        >
          {filteredFoods.length > 0 ? (
            filteredFoods.map(
              (food) =>
                food.foodStatus === "available" && (
                  <div key={food._id} className="transform transition-all duration-300 hover:-translate-y-1">
                    <FoodCard food={food} />
                  </div>
                ),
            )
          ) : (
            <div className="col-span-full rounded-2xl bg-white p-12 text-center shadow-lg">
              <div className="mx-auto mb-6 h-20 w-20 rounded-full bg-amber-100 p-4">
                <FaSearch className="h-full w-full text-amber-400" />
              </div>
              <p className="text-2xl font-medium text-amber-800">
                No foods found for "{searchQuery}"
              </p>
              <p className="mt-2 text-amber-600">
                Try adjusting your search terms or browse all available foods
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Availablefoods;