import { CheckCircle } from "lucide-react";
import { Card } from "../ui/card";
import {cn} from "../../lib/utils";
import { useEffect, useState } from "react";

interface CircularProgressProps {

  value: number;
  size?: number;
  strokeWidth?: number;
  showValue?: boolean;
  color?: string

}
function CircularProgress({
  value,
  size = 64,
  strokeWidth = 6,
  showValue = true,
  color = "--Circular color",
}: CircularProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(value), 100);
    return () => clearTimeout(timer);
  }, [value]);

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className={cn("relative inline-flex items-center justify-center")}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
        />
        \{" "}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-out"
        />
      </svg>

      {showValue && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-semibold">{Math.round(progress)}%</span>
        </div>
      )}
    </div>
  );
}


export default function ProfileProgress() {
  const steps = [
    {
      title: "Billing method",
      description:
        "Add your payment method to receive or send payments seamlessly — it only takes a minute",
      imageUrl: "/cart.png",
      completed: false,
      color: "blue",
    },
    {
      title: "Verify Email",
      description:
        "You're almost there! Verify your email to unlock full access and stay updated with job notifications",
      imageUrl: "/emil.png",
      completed: true,
      color: "green",
    },
    {
      title: "Verify Phone Number",
      description:
        "Secure your account and build trust — verify your phone number to get started with confidence",
      imageUrl: "/phone.png",
      completed: false,
      color: "blue",
    },
  ];

  const progress = 30;

  return (
    <section className="mb-8">
      <h1 className="text-2xl font-bold mb-6 mt-15 w-100 h-9 block">
        Welcome to Synapses
      </h1>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">
          Complete Your Profile before you can hire
        </h2>

        <div className="flex flex-col items-center gap-2">
          <CircularProgress
            value={progress}
            size={64}
            strokeWidth={6}
            color="#3b82f6"
          />
          <span className="text-sm">Complete Profile</span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3 ">
        {steps.map((step, i) => (
          <Card
            key={i}
            className={`p-4 ${
              step.completed
                ? "bg-gray-100 --bg-card border-orange-50"
                : "border-blue-200 hover:border-blue-300"
            }`}
          >
            <div className="flex items-start justify-between mb-3w-108 h-20 ">
              <div className="flex items-start gap-3">
                <div >
                  <img
                    src={step.imageUrl}
                    alt={step.title}
                    className="h-16 w-16 object-contain"
                  />
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">
                    Required to hire
                  </div>
                  <h3
                    className={`font-semibold ${
                      step.completed ? "text-gray-900" : "text-gray-900"
                    }`}
                  >
                    {step.title}
                  </h3>
                </div>
              </div>
              {step.completed && (
                <CheckCircle className="h-5 w-5 text-green-500" />
              )}
            </div>
            <p className="text-sm text-gray-600">{step.description}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
