import { useState } from "react";
import chocolateCake from "/assets/photos/chocolate-cake.jpg";
import cheesecake from "/assets/photos/cheesecake.jpg";
import tiramisu from "/assets/photos/tiramisu.jpg";
// import lasagna from "/assets/photos/lasagna.jpg";

const desserts = [
    {
      id: 1,
      name: 'Chocolate Cake',
      description: 'Rich and moist chocolate cake topped with creamy chocolate frosting.',
      price: 6.99,
      image: chocolateCake,
    },
    {
      id: 2,
      name: 'Cheesecake',
      description: 'Creamy New York-style cheesecake with a graham cracker crust.',
      price: 7.99,
      image: cheesecake,
    },
    {
      id: 3,
      name: 'Tiramisu',
      description: 'Classic Italian dessert made with layers of coffee-soaked ladyfingers and mascarpone cream.',
      price: 8.49,
      image: tiramisu,
    },
    // {
    //   id: 4,
    //   name: 'Apple Pie',
    //   description: 'Homemade apple pie with a flaky crust and cinnamon-spiced apple filling.',
    //   price: 5.99,
    //   image: 'https://via.placeholder.com/150',
    // },
    // {
    //   id: 5,
    //   name: 'Ice Cream Sundae',
    //   description: 'Vanilla ice cream topped with chocolate syrup, whipped cream, and a cherry.',
    //   price: 4.99,
    //   image: 'https://via.placeholder.com/150',
    // },
    // {
    //   id: 6,
    //   name: 'Chocolate Chip Cookies',
    //   description: 'Warm and gooey chocolate chip cookies, baked fresh daily.',
    //   price: 3.99,
    //   image: 'https://via.placeholder.com/150',
    // },
    // {
    //   id: 7,
    //   name: 'Strawberry Shortcake',
    //   description: 'Light and fluffy shortcake layered with fresh strawberries and whipped cream.',
    //   price: 6.49,
    //   image: 'https://via.placeholder.com/150',
    // },
    // {
    //   id: 8,
    //   name: 'Crème Brûlée',
    //   description: 'Creamy vanilla custard with a caramelized sugar topping.',
    //   price: 7.99,
    //   image: 'https://via.placeholder.com/150',
    // },
  ];

function Dessert() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = desserts.filter((item) =>
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

export default Dessert;
