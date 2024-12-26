import { FaUtensils, FaSpinner } from "react-icons/fa";

function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-amber-50 to-amber-100 text-amber-800">
      <div className="flex flex-col items-center space-y-6">
        {/* Animated Icon */}
        <div className="relative flex items-center justify-center">
          <FaUtensils className="animate-spin text-6xl text-amber-600 md:text-8xl" />
          <div className="absolute inset-0 animate-ping rounded-full bg-amber-400/30"></div>
        </div>

        <p className="text-lg font-bold tracking-wide text-amber-800 md:text-xl">
          Stirring up something delicious for you...
        </p>

        {/* Spinner */}
        <div className="flex items-center space-x-2 text-sm text-gray-700 md:text-base">
          <FaSpinner className="animate-spin text-amber-600" />
          <span>Loading...</span>
        </div>
      </div>
    </div>
  );
}

export default Loading;
