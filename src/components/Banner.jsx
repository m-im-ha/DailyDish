import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

import juicycake from "/assets/photos/juicycake.jpg";
import meatcake from "/assets/photos/meatcake.jpg";
import pancake from "/assets/photos/pancake.jpg";

function Banner() {
  const slides = [
    {
      image: pancake,
      title: "Delicious Pancakes Await!",
      description:
        "Savor the sweet taste of freshly made pancakes. Perfect for any time of day!",
      button: "Order Pancakes",
      color: "from-red-500/70 to-blue-900/70",
    },
    {
      image: meatcake,
      title: "Satisfy Your Cravings with Meat Cake",
      description:
        "Indulge in a hearty and flavorful meat cake for your next meal.",
      button: "Try Meat Cake",
      color: "from-blue-500/70 to-purple-900/70",
    },
    {
      image: juicycake,
      title: "Treat Yourself to Juicy Cakes",
      description: "Enjoy rich and moist cakes that melt in your mouth.",
      button: "Get Juicy Cakes",
      color: "from-green-500/70 to-indigo-900/70",
    },
  ];

  return (
    <div className="relative h-[400px] w-full md:h-[500px] lg:h-[600px]">
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        autoplay={{ delay: 3000 }}
        loop
        className="h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full">
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={slide.image}
                  alt={`Slide ${index + 1}`}
                  className="h-full w-full transform object-cover transition-transform duration-1000 hover:scale-105"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${slide.color}`}
                ></div>
              </div>

              {/* Content Overlay */}
              <div className="container relative z-10 mx-auto flex h-full items-center px-4 md:px-8 lg:px-16">
                <div className="max-w-md transform space-y-4 text-white transition-all duration-700 hover:scale-[1.02] md:max-w-lg md:space-y-6 lg:max-w-2xl">
                  <h2 className="mb-4 bg-gradient-to-r from-white to-white/70 bg-clip-text text-2xl font-black leading-tight tracking-tight text-transparent md:text-4xl lg:text-5xl">
                    {slide.title}
                  </h2>
                  <p className="mb-4 text-sm font-medium leading-relaxed text-white/90 md:mb-6 md:text-lg lg:text-xl">
                    {slide.description}
                  </p>
                  <button className="group flex transform items-center justify-center rounded-full bg-white px-6 py-2 text-sm font-bold text-black shadow-xl transition-all duration-300 hover:scale-105 hover:bg-gray-100 hover:shadow-2xl md:px-8 md:py-3 md:text-base lg:px-10 lg:py-4 lg:text-lg">
                    {slide.button}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 md:ml-3 md:h-5 md:w-5"
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
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Banner;
