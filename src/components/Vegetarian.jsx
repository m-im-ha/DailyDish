import { useState } from "react";
// import cheeseburger from "/assets/photos/cheeseburger.jpg";
// import pizza from "/assets/photos/pizza.jpg";
// import frenchFries from "/assets/photos/french-fries.jpg";
// import friedChicken from "/assets/photos/fried-chicken.jpg";

const vegetarianFoods = [
  {
    id: 1,
    name: "Vegetable Stir Fry",
    description:
      "A colorful mix of fresh vegetables stir-fried in a savory sauce.",
    price: 7.99,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Margherita Pizza",
    description:
      "A classic pizza topped with fresh tomatoes, mozzarella, and basil.",
    price: 9.99,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    name: "Quinoa Salad",
    description:
      "A healthy salad made with quinoa, mixed greens, cherry tomatoes, and a lemon vinaigrette.",
    price: 6.99,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    name: "Vegetable Lasagna",
    description:
      "Layers of pasta, roasted vegetables, and creamy béchamel sauce.",
    price: 10.99,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 5,
    name: "Falafel Wrap",
    description:
      "Crispy falafel balls wrapped in a warm pita with hummus, lettuce, and tahini sauce.",
    price: 5.99,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 6,
    name: "Vegetable Sushi Roll",
    description:
      "Sushi rolls filled with avocado, cucumber, and carrots, served with soy sauce.",
    price: 8.99,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 7,
    name: "Stuffed Bell Peppers",
    description:
      "Bell peppers stuffed with a mixture of rice, beans, and spices, baked to perfection.",
    price: 7.49,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 8,
    name: "Vegetable Curry",
    description:
      "A flavorful curry made with a mix of vegetables and coconut milk, served with rice.",
    price: 8.99,
    image: "https://via.placeholder.com/150",
  },
];

function Vegetarian() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = vegetarianFoods.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="w-full bg-gradient-to-b from-amber-50 to-amber-100 py-12">
      <h2 className="mb-10 text-center font-playfair text-4xl font-extrabold tracking-wide text-amber-800">
        Fast Foods
      </h2>

      {/* Search Bar */}
      <div className="mb-8 flex justify-center">
        <input
          type="text"
          placeholder="Search fast food..."
          className="w-1/2 rounded-lg border border-amber-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Fast Food Items Grid */}
      <div className="grid grid-cols-1 gap-6 px-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="overflow-hidden rounded-lg bg-white shadow-lg"
          >
            <img
              src={item.image}
              alt={item.name}
              className="h-48 w-full object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-amber-800">
                {item.name}
              </h3>
              <p className="mt-2 text-gray-600">{item.description}</p>
              <p className="mt-2 text-lg font-bold text-amber-700">
                ${item.price.toFixed(2)}
              </p>
              {/* <Link
                to={`/fastfood/${item.id}`}
                className="mt-4 inline-block px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition duration-300"
              >
                View Details
              </Link> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Vegetarian;
