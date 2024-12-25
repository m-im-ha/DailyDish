import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function Managemyfoods() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingFood, setEditingFood] = useState(null);

  // Fetch User's Foods
  useEffect(() => {
    const fetchFoods = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/foods/managefoods", {
          withCredentials: true,
        });
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
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:5000/foods/delete/${id}`, {
            withCredentials: true,
          });
          setFoods(foods.filter((food) => food._id !== id));
          Swal.fire({
            title: "Deleted!",
            text: "Your food has been deleted.",
            icon: "success",
            confirmButtonColor: "Ok",
          });
          
        } catch (error) {
          console.error("Error deleting food:", error.message);
          Swal.fire({
            icon: "error",
            title: "Failed to delete food.",
            text: "Please try again later",
          });
        }
      }
    });
  };

  // Handle Food Update
  const handleUpdate = async (id, updatedData) => {
    try {
      await axios.put(
        `http://localhost:5000/foods/updatefood/${id}`,
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

  if (loading) return <p className="text-center text-white">Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="mb-6 text-2xl font-bold">Manage My Foods</h2>
      <table className="min-w-full table-auto border-collapse border border-gray-800 text-gray-200">
        <thead>
          <tr className="bg-gray-700">
            <th className="border p-2">Name</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Quantity</th>
            <th className="border p-2">Location</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {foods.map((food) => (
            <tr key={food._id} className="bg-gray-800">
              <td className="border p-2">{food.foodName}</td>
              <td className="border p-2">${food.foodPrice}</td>
              <td className="border p-2">{food.foodQuantity}</td>
              <td className="border p-2">{food.pickupLocation}</td>
              <td className="space-x-2 border p-2">
                <button
                  className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                  onClick={() => setEditingFood(food)} // Open update modal
                >
                  Update
                </button>
                <button
                  className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                  onClick={() => handleDelete(food._id)} // Delete food
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingFood && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-96 rounded-lg bg-gray-800 p-6 shadow-lg">
            <h3 className="mb-4 text-lg font-bold">Update Food</h3>
            <input
              type="text"
              defaultValue={editingFood.foodName}
              onChange={(e) =>
                setEditingFood({ ...editingFood, foodName: e.target.value })
              }
              className="mb-2 w-full rounded-lg border p-2"
            />
            <input
              type="number"
              defaultValue={editingFood.foodPrice}
              onChange={(e) =>
                setEditingFood({ ...editingFood, foodPrice: e.target.value })
              }
              className="mb-2 w-full rounded-lg border p-2"
            />
            <input
              type="number"
              defaultValue={editingFood.foodQuantity}
              onChange={(e) =>
                setEditingFood({ ...editingFood, foodQuantity: e.target.value })
              }
              className="mb-2 w-full rounded-lg border p-2"
            />
            <input
              type="text"
              defaultValue={editingFood.pickupLocation}
              onChange={(e) =>
                setEditingFood({
                  ...editingFood,
                  pickupLocation: e.target.value,
                })
              }
              className="mb-2 w-full rounded-lg border p-2"
            />
            <div className="flex justify-end gap-2">
              <button
                className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
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
                className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
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
