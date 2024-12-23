import React from "react";
import { FaMapMarkerAlt, FaCalendarAlt, FaDollarSign } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function FoodCard({ food }) {
  const navigate = useNavigate();

  function handleViewDetails(id) {
    navigate(`/food/${id}`);
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
          <span className="font-semibold">{food.foodPrice}</span>
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

        {/* Details Button */}
        <button
          onClick={() => handleViewDetails(food._id)}
          className="w-full rounded-lg bg-pink-500 px-4 py-2 font-bold text-white hover:bg-pink-600"
        >
          View Details
        </button>
      </div>
    </div>
  );
}

export default FoodCard;
