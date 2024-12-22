import {
  FaImage,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUtensils,
  FaStickyNote,
  FaUser,
  FaEnvelope,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext, useState } from "react";
import { FoodContext } from "../provider/Foodprovider";
import Swal from "sweetalert2";
import axios from "axios";

function AddFood() {
  const { user } = useContext(FoodContext);
  const navigate = useNavigate();

  async function handleAddFood(e) {
    e.preventDefault();
    const form = new FormData(e.target);

    const foodData = {
      foodName: form.get("foodName"),
      foodImage: form.get("foodImage"),
      foodQuantity: parseInt(form.get("foodQuantity")),
      pickupLocation: form.get("pickupLocation"),
      expiredDate: form.get("expiredDate"),
      additionalNotes: form.get("additionalNotes"),
      donator: {
        image: form.get("donatorImage"),
        name: form.get("donatorName"),
        email: form.get("donatorEmail"),
      },
      foodStatus: form.get("foodStatus"),
    };
    console.log(foodData);

    try {
      const response = await axios.post(
        `http://localhost:5000/foods/addfood`,
        foodData,
      );
      console.log(`food added successfully : `, response.data);
      Swal.fire({
        title: "Food added successfully!!",
        icon: "success",
        confirmButtonColor: "Ok",
      });

      navigate("/availablefoods");
    } catch (error) {
      console.error("Error to add food", error.message);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error while adding food!",
      });
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-gray-700 bg-gray-800 shadow-2xl">
        <div className="p-8 text-center">
          <h2 className="mb-4 bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 bg-clip-text text-4xl font-extrabold text-transparent">
            Add Food Details
          </h2>
          <p className="mb-6 text-sm text-gray-400">
            Fill in the details to share your food!
          </p>

          <form onSubmit={handleAddFood} className="space-y-6">
            {/* Food Name */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FaUtensils className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Food Name"
                name="foodName"
                className="w-full rounded-xl border border-gray-600 bg-gray-700 py-3 pl-10 pr-4 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
                required
              />
            </div>

            {/* Food Image */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FaImage className="text-gray-400" />
              </div>
              <input
                type="url"
                placeholder="Food Image URL"
                name="foodImage"
                className="w-full rounded-xl border border-gray-600 bg-gray-700 py-3 pl-10 pr-4 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
                required
              />
            </div>

            {/* Food Quantity */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FaUtensils className="text-gray-400" />
              </div>
              <input
                type="number"
                placeholder="Food Quantity"
                name="foodQuantity"
                min="1"
                className="w-full rounded-xl border border-gray-600 bg-gray-700 py-3 pl-10 pr-4 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
                required
              />
            </div>

            {/* Pickup Location */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FaMapMarkerAlt className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Pickup Location"
                name="pickupLocation"
                className="w-full rounded-xl border border-gray-600 bg-gray-700 py-3 pl-10 pr-4 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
                required
              />
            </div>

            {/* Expired Date */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FaCalendarAlt className="text-gray-400" />
              </div>
              <input
                type="date"
                name="expiredDate"
                className="w-full rounded-xl border border-gray-600 bg-gray-700 py-3 pl-10 pr-4 text-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
                required
              />
            </div>

            {/* Additional Notes */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FaStickyNote className="text-gray-400" />
              </div>
              <textarea
                placeholder="Additional Notes"
                name="additionalNotes"
                rows="3"
                className="w-full rounded-xl border border-gray-600 bg-gray-700 py-3 pl-10 pr-4 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
              ></textarea>
            </div>

             {/* Donator Details */}
             <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FaUser className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Donator's Name"
                name="donatorName"
                className="w-full rounded-xl border border-gray-600 bg-gray-700 py-3 pl-10 pr-4 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
                required
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FaEnvelope className="text-gray-400" />
              </div>
              <input
                type="email"
                placeholder="Donator's Email"
                name="donatorEmail"
                className="w-full rounded-xl border border-gray-600 bg-gray-700 py-3 pl-10 pr-4 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
                required
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FaImage className="text-gray-400" />
              </div>
              <input
                type="url"
                placeholder="Donator's Image URL"
                name="donatorImage"
                className="w-full rounded-xl border border-gray-600 bg-gray-700 py-3 pl-10 pr-4 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
                required
              />
            </div>

            {/* Food Status */}
            <div className="relative">
              <select
                name="foodStatus"
                className="w-full rounded-xl border border-gray-600 bg-gray-700 py-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
                required
              >
                <option value="available">Available</option>
                <option value="unavailable">Unavailable</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full transform rounded-xl bg-gradient-to-r from-pink-500 to-red-500 py-3 font-bold text-white transition-all duration-300 hover:scale-105 hover:from-pink-600 hover:to-red-600 active:scale-95"
            >
              Add Food
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddFood;
