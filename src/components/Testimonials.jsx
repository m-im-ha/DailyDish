import { FaQuoteLeft } from "react-icons/fa";

// Testimonials Data
const testimonials = [
  {
    id: 1,
    name: "Emily Johnson",
    quote:
      "I requested food for a small party, and it was delivered on time! Such a great initiative to prevent food waste.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 2,
    name: "Mark Wilson",
    quote:
      "I donated excess food, and the process was smooth. Happy to help others through this amazing platform!",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 3,
    name: "Sophia Lee",
    quote:
      "The food was fresh and delicious! I'm so grateful for this platform. Highly recommend it!",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 4,
    name: "James Brown",
    quote:
      "This platform is life-changing! I can't believe how easy it is to request and share food. Great job!",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    id: 5,
    name: "Olivia Davis",
    quote:
      "Sharing food has never been easier. Thank you for helping us reduce food waste and feed those in need!",
    image: "https://randomuser.me/api/portraits/women/77.jpg",
  },
  {
    id: 6,
    name: "Michael Smith",
    quote:
      "Excellent service and very responsive team! Highly recommend this platform to everyone.",
    image: "https://randomuser.me/api/portraits/men/50.jpg",
  },
];


export default function Testimonials() {
  return (
    <div className="w-full bg-gradient-to-b from-amber-50 to-amber-100 py-16 px-4 sm:px-6 lg:px-8">
  
      <h2 className="font-playfair mb-10 text-center text-4xl font-extrabold text-amber-800 tracking-wide">
        What People Are Saying
      </h2>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="mt-10 flex flex-col items-center rounded-2xl bg-white shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
          >
            {/* Quote Icon */}
            <div className="relative -mt-10 mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-amber-300 to-amber-500 shadow-lg">
              <FaQuoteLeft className="text-white text-3xl" />
            </div>

            {/* Testimonial Content */}
            <div className="px-6 py-8 text-center">
              <p className="font-lato mb-6 text-lg text-gray-700 leading-relaxed">
                "{testimonial.quote}"
              </p>

              {/* Profile Image and Name */}
              <div className="flex flex-col items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="h-16 w-16 rounded-full border-4 border-amber-500 shadow-md"
                />
                <h3 className="font-lato mt-4 text-xl font-bold text-amber-800">
                  {testimonial.name}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
