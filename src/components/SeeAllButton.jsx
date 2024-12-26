import { useNavigate } from "react-router-dom";

function SeeAllButton() {
  const navigate = useNavigate();

  // Handle navigation to available foods
  function handleSeeAllFoods() {
    navigate("/availablefoods");
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-br from-green-900 via-lime-800 to-teal-800">
      <div className="text-center max-w-4xl p-8 rounded-3xl shadow-2xl bg-opacity-70 bg-white/10 backdrop-blur-xl">
        {/* Header Section */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-wide leading-tight">
          Share{" "}
          <span className="text-yellow-400 drop-shadow-[0_2px_2px_rgba(0,0,0,0.25)]">
            Food, Share Love
          </span>
          <span
            className="inline-block ml-2 text-yellow-400 transform group-hover:translate-x-2 
                      transition-transform duration-300"
          >
            &gt;
          </span>
        </h1>

        {/* Subtitle Section */}
        <p className="mt-6 text-lg sm:text-xl text-white/80 font-medium leading-relaxed">
          Explore a variety of available foods and Discover delicious meals waiting to be shared! Find fresh, available foods and make every bite count.
        </p>

        {/* Button */}
        <button
          onClick={handleSeeAllFoods}
          className="mt-10 relative inline-flex items-center px-12 py-4 bg-gradient-to-r from-green-500 to-teal-600 
                    text-white font-bold text-lg rounded-full shadow-lg 
                    hover:shadow-2xl transition-all duration-300 ease-in-out 
                    hover:scale-110 active:scale-95 focus:outline-none"
        >
          {/* Button Glow Effect */}
          <span
            className="absolute inset-0 w-full h-full bg-gradient-to-r from-green-400 via-green-500 to-teal-500 
                      blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300 rounded-full"
          ></span>

          {/* Button Text and Icon */}
          <span className="relative z-10 flex items-center space-x-2">
            <span>See Available Foods</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 transition-transform transform group-hover:translate-x-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
}

export default SeeAllButton;
