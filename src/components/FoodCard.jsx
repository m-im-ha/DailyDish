import React from "react";
import { FaMapMarkerAlt, FaCalendarAlt, FaDollarSign } from "react-icons/fa";

function FoodCard({ food }) {
  return (
    <div className="max-w-sm rounded-xl overflow-hidden shadow-lg bg-gray-800 text-gray-200">
      <img
        className="w-full h-48 object-cover"
        src={food.foodImage}
        alt={food.foodName}
      />
      <div className="p-6">
        {/* Food Name */}
        <h3 className="text-2xl font-bold mb-2 text-pink-400">
          {food.foodName}
        </h3>

        {/* Food Price */}
        <p className="flex items-center text-lg mb-2">
          <FaDollarSign className="mr-2 text-green-400" />
          <span className="font-semibold">{food.foodPrice}</span>
        </p>

        {/* Food Quantity */}
        <p className="text-lg mb-2">
          <span className="font-semibold">Quantity:</span> {food.foodQuantity}
        </p>

        {/* Pickup Location */}
        <p className="flex items-center text-lg mb-2">
          <FaMapMarkerAlt className="mr-2 text-yellow-400" />
          {food.pickupLocation}
        </p>

        {/* Expired Date */}
        <p className="flex items-center text-lg mb-2">
          <FaCalendarAlt className="mr-2 text-green-400" />
          {new Date(food.expiredDate).toDateString()}
        </p>

        {/* Food Status */}
        <p className="text-lg font-semibold mb-4">
          Status: {food.foodStatus}
        </p>

        {/* Details Button */}
        <button className="w-full py-2 px-4 rounded-lg bg-pink-500 hover:bg-pink-600 text-white font-bold">
          View Details
        </button>
      </div>
    </div>
  );
}

export default FoodCard;
