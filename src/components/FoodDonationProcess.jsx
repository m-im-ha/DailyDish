import { FaPlus, FaClipboardCheck, FaTruck, FaSmile } from "react-icons/fa";

export default function FoodDonationProcess() {
  const steps = [
    {
      id: 1,
      icon: <FaPlus className="text-green-500 text-3xl" />,
      title: "Add Food Details",
      description:
        "Provide food details including name, quantity, and pickup location.",
    },
    {
      id: 2,
      icon: <FaClipboardCheck className="text-yellow-700 text-3xl" />,
      title: "Verify Request",
      description:
        "Verify your request details to ensure accuracy before submitting.",
    },
    {
      id: 3,
      icon: <FaTruck className="text-blue-600 text-3xl" />,
      title: "Schedule Pickup",
      description:
        "Coordinate with the receiver and schedule a convenient pickup time.",
    },
    {
      id: 4,
      icon: <FaSmile className="text-pink-600 text-3xl" />,
      title: "Make an Impact",
      description:
        "Complete the donation and help reduce food waste while making a difference!",
    },
  ];

  return (
    <div className="w-full bg-gradient-to-b from-amber-50 to-amber-100 py-16 px-4 sm:px-6 lg:px-8">
  {/* Section Header */}
  <h2 className="mb-10 text-center text-4xl font-extrabold text-amber-800 tracking-wide">
    How to Donate Food?
  </h2>

  {/* Steps Grid */}
  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
    {steps.map((step) => (
      <div
        key={step.id}
        className="mt-5 flex flex-col items-center justify-center rounded-2xl bg-white shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
      >
        {/* Icon Section */}
        <div className="relative -mt-10 mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-amber-300 to-amber-500 shadow-lg">
          <div className="text-4xl text-white">{step.icon}</div>
        </div>

        {/* Step Title */}
        <h3 className="mb-4 text-xl font-bold text-amber-800">{step.title}</h3>

        {/* Step Description */}
        <p className="text-center px-4 text-gray-700 leading-relaxed">
          {step.description}
        </p>
      </div>
    ))}
  </div>
</div>

  );
}
