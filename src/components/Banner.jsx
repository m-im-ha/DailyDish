import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

import biriyani from "/assets/photos/biriyani.jpg";
import roast from "/assets/photos/roast.jpg";
import pancake from "/assets/photos/pancake.jpg";
import { useNavigate } from "react-router-dom";

function Banner() {
  const navigate = useNavigate();

  const slides = [
    {
      image: pancake,
      title: "Delicious Pancakes Await!",
      description:
        "Savor the sweet taste of freshly made pancakes. Perfect for any time of day!",
      button: "Order Pancakes",
      color: "from-amber-600/80 to-amber-750/80",
    },
    {
      image: roast,
      title: "Delight in the Flavor of Chicken Roast",
      description:
        "Experience the rich, savory taste of perfectly roasted chicken, seasoned to perfection.",
      button: "Taste Chicken Roast",
      color: "from-amber-600/80 to-amber-750/80",
    },
    {
      image: biriyani,
      title: "Savor the Taste of Authentic Biriyani",
      description:
        "Indulge in aromatic and flavorful biriyani, cooked to perfection with spices.",
      button: "Try Biriyani Now",
      color: "from-amber-600/80 to-amber-750/80",
    },
  ];

  return (
    <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] font-mont">
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        autoplay={{ delay: 3000 }}
        loop
        className="h-full [&_.swiper-button-next]:text-amber-400 [&_.swiper-button-next]:hover:text-amber-500 [&_.swiper-button-prev]:text-amber-400 [&_.swiper-button-prev]:hover:text-amber-500"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full overflow-hidden">
              {/* Background Image with Animation */}
              <div className="absolute inset-0">
                <img
                  src={slide.image}
                  alt={`Slide ${index + 1}`}
                  className="h-full w-full transform object-cover transition-all duration-1000 hover:scale-110"
                />
            
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${slide.color}`}
                ></div>
                {/* Additional Design Elements */}
                <div className="absolute inset-0 bg-[url('/path/to/pattern.png')] opacity-20"></div>
              </div>

              {/* Content Overlay with Styling */}
              <div className="container relative z-10 mx-auto flex h-full items-center px-6 md:px-12 lg:px-24">
                <div className="max-w-md transform space-y-6 text-white transition-all duration-700 hover:scale-105 md:max-w-lg lg:max-w-2xl">
                  {/* Decorative Element */}
                  <div className="mb-4 h-1 w-24 bg-gradient-to-r from-amber-400 to-yellow-300"></div>

                  {/* Title */}
                  <h2 className="font-playfair relative font-black tracking-tight md:text-4xl lg:text-6xl">
                    <span className="absolute -left-4 top-0 h-full w-2 bg-amber-400"></span>
                    <span className="bg-gradient-to-r from-amber-50 to-yellow-100 bg-clip-text text-transparent">
                      {slide.title}
                    </span>
                  </h2>

                  {/* Description */}
                  <p className="text-base font-lato font-medium leading-relaxed text-amber-50/90 md:text-lg lg:text-xl">
                    {slide.description}
                  </p>

                  {/* Button */}
                  <button onClick={()=>navigate("/availablefoods")} className="font-lato group relative overflow-hidden rounded-full bg-gradient-to-r from-amber-400 to-amber-600 px-8 py-3 font-bold text-white shadow-lg transition-all duration-300 hover:from-amber-500 hover:to-amber-700 hover:shadow-amber-500/50 md:px-10 md:py-4 lg:px-12 lg:text-lg">
                    <span className="relative z-10 flex items-center justify-center">
                      {slide.button}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="ml-2 h-5 w-5 transform transition-all duration-300 group-hover:translate-x-1 md:ml-3"
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
                    {/* Button Hover Effect */}
                    <div className="absolute inset-0 -translate-x-full transform bg-gradient-to-r from-yellow-400 to-amber-500 transition-transform duration-300 group-hover:translate-x-0"></div>
                  </button>
                </div>

                {/* Decorative Elements */}
                <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-black/20 to-transparent"></div>
                <div className="absolute -bottom-4 -right-4 h-32 w-32 rounded-full bg-amber-400/20 blur-3xl"></div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Banner;
