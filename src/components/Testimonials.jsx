import { FaQuoteLeft } from "react-icons/fa";

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
];

export default function Testimonials() {
  return (
    <div className="container mx-auto py-10">
      <h2 className="mb-6 text-3xl font-bold text-center text-green-500">
        What People Are Saying
      </h2>
      <div className="grid gap-8 md:grid-cols-3">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="rounded-lg bg-gray-800 p-6 shadow-lg"
          >
            <FaQuoteLeft className="text-yellow-400 text-4xl mb-4" />
            <p className="text-gray-300 mb-4">{testimonial.quote}</p>
            <div className="flex items-center space-x-4">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="h-12 w-12 rounded-full border-2 border-pink-500"
              />
              <p className="text-gray-200 font-semibold">{testimonial.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
