import { FaRocket } from "react-icons/fa";

function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white">
      <div className="flex flex-col items-center space-y-6">
        <div className="relative flex items-center justify-center">
          <FaRocket className="text-6xl md:text-8xl animate-bounce text-purple-400" />
          <div className="absolute inset-0 animate-ping rounded-full bg-purple-500/30"></div>
        </div>
        <p className="text-lg md:text-xl font-semibold tracking-wide">
          Hold tight! We’re launching your experience...
        </p>
      </div>
    </div>
  );
}

export default Loading;