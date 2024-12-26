import { FaPlus, FaClipboardCheck, FaTruck, FaSmile } from "react-icons/fa";

export default function FoodDonationProcess() {
  const steps = [
    {
      id: 1,
      icon: <FaPlus className="text-green-400 text-3xl" />,
      title: "Add Food Details",
      description:
        "Provide food details including name, quantity, and pickup location.",
    },
    {
      id: 2,
      icon: <FaClipboardCheck className="text-yellow-400 text-3xl" />,
      title: "Verify Request",
      description:
        "Verify your request details to ensure accuracy before submitting.",
    },
    {
      id: 3,
      icon: <FaTruck className="text-blue-400 text-3xl" />,
      title: "Schedule Pickup",
      description:
        "Coordinate with the receiver and schedule a convenient pickup time.",
    },
    {
      id: 4,
      icon: <FaSmile className="text-pink-400 text-3xl" />,
      title: "Make an Impact",
      description:
        "Complete the donation and help reduce food waste while making a difference!",
    },
  ];

  return (
    <div className="container mx-auto py-10">
      <h2 className="mb-6 text-3xl font-bold text-center text-purple-500">
        How to Donate Food?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {steps.map((step) => (
          <div
            key={step.id}
            className="flex flex-col items-center justify-center rounded-lg bg-gray-800 p-6 shadow-lg transition-transform hover:scale-105"
          >
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-700">
              {step.icon}
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-200">
              {step.title}
            </h3>
            <p className="text-center text-gray-400">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
