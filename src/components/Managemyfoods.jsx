import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Loading from "../ui/Loading";
import { useNavigate } from "react-router-dom";

function Managemyfoods() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingFood, setEditingFood] = useState(null);
  const navigate = useNavigate();

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
    <div className="container mx-auto p-4">
      <h2 className="font-playfair mb-8 text-center text-4xl font-extrabold text-amber-800">
        Manage My Foods
      </h2>

      {foods.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-6 py-20">
          <p className="text-lg text-gray-600">
            You haven't added any food yet!
          </p>
          <button
            onClick={() => navigate("/addfood")}
            className="rounded-lg bg-gradient-to-r from-amber-500 to-amber-700 px-6 py-3 font-bold text-white shadow-lg transition-all duration-300 hover:from-amber-600 hover:to-amber-800"
          >
            Add Food Now
          </button>
        </div>
      ) : (
        // Show Table if Foods Exist
        <div className="overflow-x-auto rounded-xl shadow-lg">
          <table className="min-w-full table-auto border-collapse bg-white text-gray-800">
            <thead>
              <tr className="bg-gradient-to-r from-amber-500 to-amber-700 text-white">
                <th className="border p-4 text-left text-lg font-semibold">
                  Name
                </th>
                <th className="border p-4 text-left text-lg font-semibold">
                  Price
                </th>
                <th className="border p-4 text-left text-lg font-semibold">
                  Quantity
                </th>
                <th className="border p-4 text-left text-lg font-semibold">
                  Location
                </th>
                <th className="border p-4 text-left text-lg font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {foods.map((food) => (
                <tr
                  key={food._id}
                  className="odd:bg-white even:bg-amber-50 hover:bg-amber-100"
                >
                  <td className="border p-4 font-medium text-gray-700">
                    {food.foodName}
                  </td>
                  <td className="border p-4 font-medium text-gray-700">
                    ${food.foodPrice}
                  </td>
                  <td className="border p-4 font-medium text-gray-700">
                    {food.foodQuantity}
                  </td>
                  <td className="border p-4 font-medium text-gray-700">
                    {food.pickupLocation}
                  </td>
                  <td className="border p-4">
                    <div className="flex items-center gap-2">
                      <button
                        className="rounded-lg bg-blue-500 px-4 py-2 font-medium text-white shadow-md transition-all duration-300 hover:bg-blue-600"
                        onClick={() => setEditingFood(food)}
                      >
                        Update
                      </button>
                      <button
                        className="rounded-lg bg-red-500 px-4 py-2 font-medium text-white shadow-md transition-all duration-300 hover:bg-red-600"
                        onClick={() => handleDelete(food._id)}
                      >
                        Delete
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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="mb-6 text-center text-2xl font-extrabold text-amber-800">
              Update Food
            </h3>

            <div className="space-y-4">
              {/* Title */}
              <label className="block font-bold text-gray-700">Title:</label>
              <input
                type="text"
                defaultValue={editingFood.foodName}
                onChange={(e) =>
                  setEditingFood({ ...editingFood, foodName: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />

              {/* Price */}
              <label className="block font-bold text-gray-700">Price:</label>
              <input
                type="number"
                defaultValue={editingFood.foodPrice}
                onChange={(e) =>
                  setEditingFood({ ...editingFood, foodPrice: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />

              {/* Quantity */}
              <label className="block font-bold text-gray-700">Quantity:</label>
              <input
                type="number"
                defaultValue={editingFood.foodQuantity}
                onChange={(e) =>
                  setEditingFood({
                    ...editingFood,
                    foodQuantity: e.target.value,
                  })
                }
                className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />

              {/* Location */}
              <label className="block font-bold text-gray-700">Location:</label>
              <input
                type="text"
                defaultValue={editingFood.pickupLocation}
                onChange={(e) =>
                  setEditingFood({
                    ...editingFood,
                    pickupLocation: e.target.value,
                  })
                }
                className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="mt-6 flex justify-end gap-4">
              <button
                className="rounded-lg bg-gradient-to-r from-amber-500 to-amber-700 px-6 py-3 font-bold text-white shadow-lg hover:from-amber-600 hover:to-amber-800 focus:outline-none"
                onClick={() =>
                  handleUpdate(editingFood._id, {
                    foodName: editingFood.foodName,
                    foodPrice: editingFood.foodPrice,
                    foodQuantity: editingFood.foodQuantity,
                    pickupLocation: editingFood.pickupLocation,
                  })
                }
              >
                Save
              </button>
              <button
                className="rounded-lg bg-gradient-to-r from-red-500 to-red-700 px-6 py-3 font-bold text-white shadow-lg hover:from-red-600 hover:to-red-800 focus:outline-none"
                onClick={() => setEditingFood(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Managemyfoods;
