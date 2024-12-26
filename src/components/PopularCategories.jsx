import { Link } from "react-router-dom";
import {
  FaPizzaSlice,
  FaAppleAlt,
  FaIceCream,
  FaHamburger,
} from "react-icons/fa";

const categories = [
  {
    id: 1,
    name: "Fast Food",
    icon: <FaHamburger />,
    // path: "/category/fast-food",
  },
  {
    id: 2,
    name: "Vegetarian",
    icon: <FaAppleAlt />,
    // path: "/category/vegetarian",
  },
  {
    id: 3,
    name: "Desserts",
    icon: <FaIceCream />,
    //    path: "/category/desserts"
  },
  {
    id: 4,
    name: "Pizza",
    icon: <FaPizzaSlice />,
    //  path: "/category/pizza"
  },
];

function PopularCategories() {
  return (
    <div className="container mx-auto py-10">
      <h2 className="mb-6 text-center text-3xl font-bold text-pink-500">
        Popular Categories
      </h2>
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            // to={category.path}
            className="flex flex-col items-center justify-center rounded-lg bg-gray-800 p-6 shadow-lg transition-transform hover:scale-105"
          >
            <div className="text-4xl text-yellow-400">{category.icon}</div>
            <p className="mt-4 text-lg font-semibold text-gray-200">
              {category.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default PopularCategories;
