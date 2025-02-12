import { useState } from 'react';
import cheeseburger from "/assets/photos/cheeseburger.jpg";
import pizza from "/assets/photos/pizza.jpg";
import frenchFries from "/assets/photos/french-fries.jpg";
import friedChicken from "/assets/photos/fried-chicken.jpg";

const fastFoodItems = [
  {
    id: 1,
    name: 'Cheeseburger',
    description: 'A classic cheeseburger with lettuce, tomato, and pickles.',
    price: 5.99,
    image: cheeseburger,
  },
  {
    id: 2,
    name: 'Pizza',
    description: 'A delicious pizza with pepperoni, mushrooms, and mozzarella cheese.',
    price: 8.99,
    image: pizza,
  },
  {
    id: 3,
    name: 'French Fries',
    description: 'Crispy golden french fries served with ketchup.',
    price: 3.99,
    image: frenchFries,
  },
  {
    id: 4,
    name: 'Fried Chicken',
    description: 'Juicy fried chicken with a crispy coating.',
    price: 7.99,
    image: friedChicken,
  },
];

function Fastfood() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = fastFoodItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
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
          className="w-1/2 px-4 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Fast Food Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-amber-800">{item.name}</h3>
              <p className="mt-2 text-gray-600">{item.description}</p>
              <p className="mt-2 text-lg font-bold text-amber-700">${item.price.toFixed(2)}</p>
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

export default Fastfood;