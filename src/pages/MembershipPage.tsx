import { useState } from "react";
import Header from "../components/layout/Header";
import { CircleCheck } from "lucide-react";
import { Button } from "../components/ui/button";

const PLANS_DATA = {
  case: [
    {
      id: "basic",
      name: "Individual plan",
      price: 100,
      popular: true,
      description: "Basic features for 1 user.",
      ctaLeft: "Current Plan",
      ctaRight: "Upgrade now",
      isPrimary: false,
    },
    {
      id: "pro",
      name: "Individual plan",
      price: 160,
      popular: true,
      description: "Basic features for 1 user.",
      ctaLeft: "Current Plan",
      ctaRight: "Upgrade now",
      isPrimary: false,
    },
    {
      id: "enterprise",
      name: "Individual plan",
      price: 200,
      popular: true,
      description: "Basic features for 1 user.",
      ctaLeft: "Current Plan",
      ctaRight: "Upgrade now",
      isPrimary: false,
    },
  ],
  monthly: [
    {
      id: "basic",
      name: "Basic Plan",
      price: 50,
      popular: true,
      description: "Basic features for 1 user per month.",
      ctaLeft: "Current Plan",
      ctaRight: "Upgrade now",
    },
    {
      id: "pro",
      name: "Professional Plan",
      price: 80,
      popular: true,
      description: "Advanced features for professionals per month.",
      ctaLeft: "Current Plan",
      ctaRight: "Upgrade now",
    },
    {
      id: "enterprise",
      name: "Enterprise Plan",
      price: 120,
      popular: true,
      description: "Complete features for teams per month.",
      ctaLeft: "Current Plan",
      ctaRight: "Upgrade now",
    },
  ],
};

const FEATURES = [
  "Access to basic features",
  "Access to basic features",
  "Access to basic features",
  "Access to basic features",
  "Access to basic features",
];

export default function MembershipPage() {
  const [billingCycle, setBillingCycle] = useState<"case" | "monthly">("case");
  const currentPlans = PLANS_DATA[billingCycle];

  return (
    <main className="min-h-screen bg-(--gray-50)">
      <Header isOnMembershipPage />

      <div className="container mx-auto px-4 py-12">
        <div className="mb-16">
          <h1 className="text-2xl font-semibold text-(--gray-900)">
            Fees Plan
          </h1>
        </div>

        <div id="pricing" className="space-y-12">
          <div className="text-center space-y-6">
            <p className="text-(--primary-500) font-semibold text-sm uppercase tracking-wide">
              Pricing
            </p>
            <h2 className="text-xl text-(--gray-700)">
              Choose the Perfect Plan for You
            </h2>

            <div className="flex justify-center">
              <div className="inline-flex bg-[#DCF1FF80] rounded-full">
                <button
                  onClick={() => setBillingCycle("case")}
                  className={`px-8 py-3 rounded-full font-semibold transition-all ${
                    billingCycle === "case"
                      ? "bg-(--primary-500) text-white"
                      : "bg-transparent text-(--gray-500)"
                  }`}
                >
                  Per Case
                </button>
                <button
                  onClick={() => setBillingCycle("monthly")}
                  className={`px-8 py-3 rounded-full font-semibold transition-all ${
                    billingCycle === "monthly"
                      ? "bg-(--primary-500) text-white shadow-md"
                      : "bg-transparent text-(--gray-500) "
                  }`}
                >
                  Monthly
                </button>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto mt-12">
            {currentPlans.map((plan) => (
              <div
                key={plan.id}
                className="rounded-2xl p-8 bg-white border border-(--gray-50) shadow-sm hover:shadow-md transition-all"
              >
                <div className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-(--gray-500) font-normal">
                        {plan.name}
                      </p>
                      {plan.popular && (
                        <span
                          className="border border-(--primary-50) text-(--primary-500) px-2 py-1 rounded-full text-xs font-normal shadow-sm"
                          style={{
                            boxShadow: "0 1px 3px 0 rgb(10 143 220 / 0.2)",
                          }}
                        >
                          Popular
                        </span>
                      )}
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-[32px] font-bold text-(--gray-700)">
                        ${plan.price}
                      </span>
                      <span className="text-(--gray-500) ">per Case</span>
                    </div>
                    <p className="text-(--gray-500) ">{plan.description}</p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button className="flex-1 rounded-full font-bold transition-all bg-(--gray-50) text-(--gray-500)  border-none ">
                      {plan.ctaLeft}
                    </Button>
                    <Button className="flex-1 px-8 py-6 rounded-full font-bold transition-all bg-(--primary-500) text-white shadow-md border-none ">
                      {plan.ctaRight}
                    </Button>
                  </div>

                  <div className=" border-t border-(--gray-100) pt-6">
                    <div className="space-y-1">
                      <p className="font-normal text-(--gray-700) uppercase tracking-wide ">
                        FEATURES
                      </p>
                      <p className="text-ms text-(--gray-500) mb-6">
                        Everything in our free plan plus....
                      </p>
                    </div>

                    <div className="space-y-3">
                      {FEATURES.map((feature, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <CircleCheck className="w-6 h-6 text-(--primary-500) flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-(--gray-500)">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
