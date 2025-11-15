"use client";

import { Card } from "../ui/card";
import { cn } from "../../lib/utils";
import { useEffect, useState } from "react";

interface CircularProgressProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  showValue?: boolean;
  color?: string;
}

function CircularProgress({
  value,
  size = 64,
  strokeWidth = 6,
  showValue = true,
  color = "var(--primary-500)",
}: CircularProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(value), 100);
    return () => clearTimeout(timer);
  }, [value]);

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  const strokeColor = getComputedStyle(document.documentElement)
    .getPropertyValue(color)
    .trim();

  return (
    <div className={cn("relative inline-flex items-center justify-center")}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--gray-200)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={strokeColor || "#016bac"}
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
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Welcome to Synapses</h1>
      </div>

      <div className="flex items-center justify-between gap-6">
        <h2 className="text-xl font-semibold flex-1">
          Complete Your Profile before you can hire
        </h2>

        <div className="flex flex-col items-center gap-3 flex-shrink-0">
          <CircularProgress
            value={progress}
            size={64}
            strokeWidth={6}
            color="var(--primary-500)"
          />
          <span className="text-xs text-(--gray-600)">Complete Profile</span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {steps.map((step, i) => (
          <Card
            key={i}
            className={`p-6 space-y-4 ${
              step.completed
                ? "bg-(--gray-100) border-(--primary-50)"
                : "border-(--primary-200) hover:border-(--primary-300)"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <img
                    src={step.imageUrl || "/placeholder.svg"}
                    alt={step.title}
                    className="h-14 w-14 object-contain"
                  />
                </div>
                <div className="space-y-2">
                  <div className="text-xs text-(--gray-500)">
                    Required to hire
                  </div>
                  <h3 className="font-semibold text-(--gray-900)">
                    {step.title}
                  </h3>
                </div>
              </div>
              {step.completed && (
                <img 
                  src="/ok.png"
                  alt="ok"
                className="h-5 w-5 text-(--secondary-500) flex-shrink-0" />
              )}
            </div>
            <p className="text-sm text-(--gray-600)">{step.description}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
