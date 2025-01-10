import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Loading from "../ui/Loading";
import { useNavigate } from "react-router-dom";

function Managemyfoods() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingFood, setEditingFood] = useState(null);
  const navigate = useNavigate();

  console.log(foods);

  // Fetch User's Foods
  useEffect(() => {
    const fetchFoods = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "https://dailydishserver.vercel.app/foods/managefoods",
          { withCredentials: true },
        );
        setFoods(res.data);
      } catch (error) {
        console.error("Error fetching foods:", error.message);
        Swal.fire({
          icon: "error",
          title: "Failed to load foods.",
          text: "Please try again later",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  // Handle Food Deletion
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to recover this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3086d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `https://dailydishserver.vercel.app/foods/delete/${id}`,
            { withCredentials: true },
          );
          setFoods(foods.filter((food) => food._id !== id));
          Swal.fire("Deleted!", "Your food has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting food:", error.message);
          Swal.fire("Oops!", "Failed to delete food.", "error");
        }
      }
    });
  };

  // Handle Food Update
  const handleUpdate = async (id, updatedData) => {
    try {
      await axios.put(
        `https://dailydishserver.vercel.app/foods/updatefood/${id}`,
        updatedData,
        { withCredentials: true },
      );
      setFoods(
        foods.map((food) =>
          food._id === id ? { ...food, ...updatedData } : food,
        ),
      );
      setEditingFood(null);
      Swal.fire("Updated!", "Food updated successfully!", "success");
    } catch (error) {
      console.error("Error updating food:", error.message);
      Swal.fire("Oops!", "Failed to update food.", "error");
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="container mx-auto p-2 sm:p-4">
      <div className="mb-8 w-full text-center">
        <h1 className="mt-10 relative inline-block font-playfair text-4xl font-black tracking-tight text-amber-800 md:text-5xl">
          <span className="relative z-10">Manage My Foods</span>
          <div className="absolute -bottom-2 left-0 h-3 w-full bg-amber-200/60"></div>
        </h1>
      </div>

      {foods.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-amber-100 bg-amber-50 px-4 py-12 sm:gap-6 sm:py-20">
          <p className="text-center text-lg text-gray-600 sm:text-xl">
            You haven't added any food yet!
          </p>
          <button
            onClick={() => navigate("/addfood")}
            className="group relative transform rounded-lg bg-gradient-to-r from-amber-500 to-amber-700 px-6 py-2.5 font-bold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:from-amber-600 hover:to-amber-800 hover:shadow-lg sm:px-8 sm:py-3"
          >
            Add Food Now
            <span className="absolute inset-0 rounded-lg bg-white/20 opacity-0 transition-opacity group-hover:opacity-100"></span>
          </button>
        </div>
      ) : (
        <div className="w-full overflow-x-auto rounded-xl border border-amber-100 shadow-xl mb-8">
          <table className="min-w-full table-auto border-collapse bg-white text-gray-800">
            <thead>
              <tr className="bg-gradient-to-r from-amber-500 to-amber-700 text-white">
                <th className="whitespace-nowrap border-b border-amber-400 p-3 text-left text-base font-semibold sm:p-5 sm:text-lg">
                  Name
                </th>
                <th className="whitespace-nowrap border-b border-amber-400 p-3 text-left text-base font-semibold sm:p-5 sm:text-lg">
                  Price
                </th>
                <th className="whitespace-nowrap border-b border-amber-400 p-3 text-left text-base font-semibold sm:p-5 sm:text-lg">
                  Quantity
                </th>
                <th className="whitespace-nowrap border-b border-amber-400 p-3 text-left text-base font-semibold sm:p-5 sm:text-lg">
                  Location
                </th>
                <th className="whitespace-nowrap border-b border-amber-400 p-3 text-left text-base font-semibold sm:p-5 sm:text-lg">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {foods.map((food) => (
                <tr
                  key={food._id}
                  className="transition-colors duration-150 odd:bg-white even:bg-amber-50 hover:bg-amber-100/50"
                >
                  <td className="border-b border-amber-100 p-3 sm:p-5">
                    <div className="flex items-center gap-2 sm:gap-4">
                      {/* Image hidden on mobile, visible on sm and above */}
                      <img
                        className="hidden h-16 w-16 rounded-lg border-2 border-amber-200 object-cover sm:block"
                        src={food.foodImage}
                        alt={food.foodName}
                      />
                      {/* Food name - larger text on mobile since we have more space */}
                      <span className="text-base font-medium text-gray-700">
                        {food.foodName}
                      </span>
                    </div>
                  </td>
                  <td className="border-b border-amber-100 p-3 font-medium text-gray-700 sm:p-5">
                    <span className="rounded-full bg-amber-100 px-2 py-1 text-sm sm:px-3 sm:text-base">
                      ${food.foodPrice}
                    </span>
                  </td>
                  <td className="border-b border-amber-100 p-3 font-medium text-gray-700 sm:p-5">
                    <span className="rounded-full bg-green-100 px-2 py-1 text-sm sm:px-3 sm:text-base">
                      {food.foodQuantity} left
                    </span>
                  </td>
                  <td className="border-b border-amber-100 p-3 font-medium text-gray-700 sm:p-5">
                    <div className="flex items-center gap-1 text-sm sm:gap-2 sm:text-base">
                      <svg
                        className="h-4 w-4 text-gray-500 sm:h-5 sm:w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span className="truncate">{food.pickupLocation}</span>
                    </div>
                  </td>
                  <td className="border-b border-amber-100 p-3 sm:p-5">
                    <div className="flex flex-col gap-2 sm:flex-row">
                      <button
                        onClick={() => setEditingFood(food)}
                        className="transform rounded-lg bg-emerald-500 p-2 text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-600 hover:shadow-lg"
                        title="Update Food"
                      >
                        <svg
                          className="h-4 w-4 sm:h-5 sm:w-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(food._id)}
                        className="transform rounded-lg bg-rose-500 p-2 text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-rose-600 hover:shadow-lg"
                        title="Delete Food"
                      >
                        <svg
                          className="h-4 w-4 sm:h-5 sm:w-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Update Modal */}
      {editingFood && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg transform rounded-2xl bg-white p-4 shadow-2xl transition-all sm:p-8">
            <h3 className="relative mb-6 text-center text-xl font-extrabold text-amber-800 sm:mb-8 sm:text-2xl">
              Update Food
              <span className="absolute bottom-0 left-1/2 mt-2 h-1 w-16 -translate-x-1/2 transform bg-amber-500 sm:w-20"></span>
            </h3>

            <div className="space-y-4 sm:space-y-6">
              <div className="space-y-4">
                <div className="space-y-1 sm:space-y-2">
                  <label className="block text-sm font-bold text-gray-700 sm:text-base">
                    Food Title
                  </label>
                  <input
                    type="text"
                    defaultValue={editingFood.foodName}
                    onChange={(e) =>
                      setEditingFood({
                        ...editingFood,
                        foodName: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500 sm:p-3 sm:text-base"
                  />
                </div>

                <div className="space-y-1 sm:space-y-2">
                  <label className="block text-sm font-bold text-gray-700 sm:text-base">
                    Price
                  </label>
                  <input
                    type="number"
                    defaultValue={editingFood.foodPrice}
                    onChange={(e) =>
                      setEditingFood({
                        ...editingFood,
                        foodPrice: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500 sm:p-3 sm:text-base"
                  />
                </div>

                <div className="space-y-1 sm:space-y-2">
                  <label className="block text-sm font-bold text-gray-700 sm:text-base">
                    Quantity
                  </label>
                  <input
                    type="number"
                    defaultValue={editingFood.foodQuantity}
                    onChange={(e) =>
                      setEditingFood({
                        ...editingFood,
                        foodQuantity: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500 sm:p-3 sm:text-base"
                  />
                </div>

                <div className="space-y-1 sm:space-y-2">
                  <label className="block text-sm font-bold text-gray-700 sm:text-base">
                    Location
                  </label>
                  <input
                    type="text"
                    defaultValue={editingFood.pickupLocation}
                    onChange={(e) =>
                      setEditingFood({
                        ...editingFood,
                        pickupLocation: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500 sm:p-3 sm:text-base"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3 sm:mt-8">
                <button
                  className="transform rounded-lg bg-emerald-500 px-4 py-2 text-sm font-bold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-600 hover:shadow-lg sm:px-6 sm:py-2.5 sm:text-base"
                  onClick={() =>
                    handleUpdate(editingFood._id, {
                      foodName: editingFood.foodName,
                      foodPrice: editingFood.foodPrice,
                      foodQuantity: editingFood.foodQuantity,
                      pickupLocation: editingFood.pickupLocation,
                    })
                  }
                >
                  Save Changes
                </button>
                <button
                  className="transform rounded-lg bg-rose-500 px-4 py-2 text-sm font-bold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-rose-600 hover:shadow-lg sm:px-6 sm:py-2.5 sm:text-base"
                  onClick={() => setEditingFood(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Managemyfoods;
