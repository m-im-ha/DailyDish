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
    <div className="w-full py-12 bg-gradient-to-b from-amber-50 to-amber-100">
  <h2 className="font-playfair mb-10 text-center text-4xl font-extrabold text-amber-800 tracking-wide">
    Popular Categories
  </h2>

  <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4 px-5">
    {categories.map((category) => (
      <Link
        key={category.id}
        // to={category.path}
        className="flex flex-col items-center justify-center rounded-xl bg-white shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
      >
        {/* Icon Section */}
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-amber-300 to-amber-500 shadow-lg mt-5">
          <div className="text-4xl text-white">{category.icon}</div>
        </div>

        {/* Category Name */}
        <p className="font-lato my-4 text-lg font-bold text-amber-800">{category.name}</p>
      </Link>
    ))}
  </div>
</div>

  );
}

export default PopularCategories;
