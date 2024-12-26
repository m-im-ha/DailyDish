import React from "react";
import { FaMapMarkerAlt, FaCalendarAlt, FaDollarSign, FaUtensils } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function FoodCard({ food }) {
  const navigate = useNavigate();

  function handleViewDetails(id) {
    navigate(`/food/${id}`);
  }

  return (
    <div
      key={food._id}
      className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={food.foodImage}
          alt={food.foodName}
          className="h-full w-full transform object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 -mt-16 p-6">
        <div className="rounded-xl bg-white p-6 shadow-lg transition-all duration-300 group-hover:shadow-xl">
          {/* Title */}
          <h3 className="mb-4 text-2xl font-bold text-amber-800">
            {food.foodName}
          </h3>

          {/* Info Grid */}
          <div className="mb-6 space-y-3">
            <div className="flex items-center space-x-3">
              <div className="rounded-full bg-amber-100 p-2">
                <FaUtensils className="text-lg text-amber-600" />
              </div>
              <span className="text-lg font-medium text-gray-700">
                Quantity: {food.foodQuantity}
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <div className="rounded-full bg-amber-100 p-2">
                <FaDollarSign className="text-lg text-amber-600" />
              </div>
              <span className="text-lg font-medium text-gray-700">
                Price: ${food.foodPrice}
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <div className="rounded-full bg-amber-100 p-2">
                <FaMapMarkerAlt className="text-lg text-amber-600" />
              </div>
              <span className="text-lg font-medium text-gray-700">
                {food.pickupLocation}
              </span>
            </div>
          </div>

          {/* Button */}
          <button
             onClick={() => handleViewDetails(food._id)}
            className="group relative w-full overflow-hidden rounded-full bg-gradient-to-r from-amber-300 to-amber-500 px-6 py-3 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:shadow-amber-300/30"
          >
            <span className="relative z-10 flex items-center justify-center">
              View Details
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-2 h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-1"
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
      <div className="absolute -right-12 -top-12 h-24 w-24 rounded-full bg-amber-400/10 blur-2xl transition-all duration-300 group-hover:bg-amber-400/20"></div>
      <div className="absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-amber-400/10 blur-2xl transition-all duration-300 group-hover:bg-amber-400/20"></div>
    </div>
  );
}

export default FoodCard;
