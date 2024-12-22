import axios from "axios";
import { useEffect, useState } from "react";
import FoodCard from "./FoodCard";

function Availablefoods() {
  const [availablefoods, setAvailablefoods] = useState([]);
  console.log(availablefoods)

  useEffect(() => {
    async function fetchAvailablefoods() {
      try {
        const response = await axios.get(
          `http://localhost:5000/foods/availablefoods`,
        );
        setAvailablefoods(response.data);
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchAvailablefoods();
  }, []);
  return (
    <div className="grid grid-cols-3 gap-5">
      {availablefoods.map((food) => food.foodStatus === "available" && (
        <div key={food._id}>
          <FoodCard food={food} />
        </div>
      ))}
    </div>
  );
}

export default Availablefoods;
