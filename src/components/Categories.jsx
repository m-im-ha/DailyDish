import {
  FaAppleAlt,
  FaBreadSlice,
  FaCoffee,
  FaHamburger,
  FaIceCream,
  FaPizzaSlice,
  FaUtensils,
} from "react-icons/fa";
import { FaBowlFood } from "react-icons/fa6";
import { Link } from "react-router-dom";

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
    // path: "/category/desserts"
  },
  {
    id: 4,
    name: "Pizza",
    icon: <FaPizzaSlice />,
    // path: "/category/pizza"
  },
  {
    id: 5,
    name: "Beverages", // or Drinks
    icon: <FaCoffee />,
    // path: "/category/beverages",
  },
  {
    id: 6,
    name: "Seafood",
    icon: <FaUtensils />, // Or a fish icon if you find a suitable one
    // path: "/category/seafood",
  },
  {
    id: 7,
    name: "Salads",
    icon: <FaBowlFood />,
    // path: "/category/salads",
  },
  {
    id: 8,
    name: "Bakery",
    icon: <FaBreadSlice />,
    // path: "/category/bakery",
  },
];

function Categories() {
  return (
    <div className="w-full bg-gradient-to-b from-amber-50 to-amber-100 py-12">
      <h2 className="mb-10 text-center font-playfair text-4xl font-extrabold tracking-wide text-amber-800">
        Popular Categories
      </h2>

      <div className="grid grid-cols-2 gap-8 px-12 sm:grid-cols-3 lg:grid-cols-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            // to={category.path}
            className="flex transform flex-col items-center justify-center rounded-xl bg-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            {/* Icon Section */}
            <div className="mt-5 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-amber-300 to-amber-500 shadow-lg">
              <div className="text-4xl text-white">{category.icon}</div>
            </div>

            {/* Category Name */}
            <p className="my-4 font-lato text-lg font-bold text-amber-800">
              {category.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Categories;
