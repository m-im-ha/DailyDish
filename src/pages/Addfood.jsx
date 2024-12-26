import {
  FaImage,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUtensils,
  FaStickyNote,
} from "react-icons/fa";
import { LuBadgeDollarSign } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import FoodContext from "../provider/FoodContext";

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
      foodPrice: parseInt(form.get("foodPrice")),
      pickupLocation: form.get("pickupLocation"),
      expiredDate: form.get("expiredDate"),
      additionalNotes: form.get("additionalNotes"),
      donator: {
        image: user.photoURL,
        name: user.displayName,
        email: user.email,
      },
      foodStatus: form.get("foodStatus"),
    };
    console.log("Food Data Sent:", foodData);


    try {
      const response = await axios.post(
        `https://dailydishserver.vercel.app/foods/addfood`,
        foodData,
        {
          withCredentials: true,
        },
      );

      Swal.fire({
        title: "Food added successfully!",
        icon: "success",
        confirmButtonColor: "Ok",
      });

      navigate("/availablefoods");
    } catch (error) {
      console.error("Error adding food:", error.message);

      // Handle Unauthorized Access
      if (error.response && error.response.status === 401) {
        Swal.fire({
          icon: "error",
          title: "Unauthorized! Please log in again.",
          text: "Please try again later",
        });
        navigate("/login");
      } else if (error.response && error.response.status === 403) {
        Swal.fire({
          icon: "error",
          title: "Access forbidden! Permission denied.",
          text: "Please try again later",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to add food.",
          text: "Please try again later",
        });
      }
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-amber-50 to-amber-100 px-4 py-10">
      <div className="w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-xl">
        <div className="p-8 text-center">
          <h2 className="font-playfair mb-6 text-5xl font-extrabold text-amber-800">
            Share Your Delicious Dish
          </h2>
          <p className="font-lato mb-8 text-lg text-gray-600">
            Contribute to reducing food waste and make a difference by sharing
            your surplus food with others in need.
          </p>

          <form
            onSubmit={handleAddFood}
            className="grid grid-cols-1 gap-6 md:grid-cols-2"
          >
            {/* Food Name */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FaUtensils className="text-amber-600" />
              </div>
              <input
                type="text"
                placeholder="Food Name"
                name="foodName"
                className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>

            {/* Food Image */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FaImage className="text-amber-600" />
              </div>
              <input
                type="url"
                placeholder="Food Image URL"
                name="foodImage"
                className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>

            {/* Food Quantity */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FaUtensils className="text-amber-600" />
              </div>
              <input
                type="number"
                placeholder="Food Quantity"
                name="foodQuantity"
                min="1"
                className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>

            {/* Food Price */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <LuBadgeDollarSign className="text-amber-600" />
              </div>
              <input
                type="number"
                placeholder="Food Price"
                name="foodPrice"
                min="1"
                className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>

            {/* Pickup Location */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FaMapMarkerAlt className="text-amber-600" />
              </div>
              <input
                type="text"
                placeholder="Pickup Location"
                name="pickupLocation"
                className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>

            {/* Expired Date */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FaCalendarAlt className="text-amber-600" />
              </div>
              <input
                type="date"
                name="expiredDate"
                className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>

            {/* Food Status */}
            <div className="relative">
              <select
                name="foodStatus"
                className="w-full rounded-lg border border-gray-300 bg-white py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              >
                <option value="available">Available</option>
                <option value="unavailable">Unavailable</option>
              </select>
            </div>

            {/* Additional Notes */}
            <div className="relative md:col-span-2">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FaStickyNote className="text-amber-600" />
              </div>
              <textarea
                placeholder="Additional Notes"
                name="additionalNotes"
                rows="3"
                className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full rounded-lg bg-gradient-to-r from-amber-500 to-amber-700 py-3 font-bold text-white transition-all duration-300 hover:from-amber-600 hover:to-amber-800"
              >
                Add Food
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddFood;
