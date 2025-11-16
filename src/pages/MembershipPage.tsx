import { CircleCheck } from "lucide-react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../components/ui/tabs";
import Header from "../components/layout/Header";

interface Plan {
  id: string;
  name: string;
  price: number;
  popular: boolean;
  description: string;
  ctaLeft: string;
  ctaRight: string;
}

type BillingCycle = "case" | "monthly";

const PLANS_DATA: Record<BillingCycle, Plan[]> = {
  case: [
    {
      id: "basic",
      name: "Individual Plan",
      price: 100,
      popular: true,
      description: "Basic features for 1 user.",
      ctaLeft: "Current Plan",
      ctaRight: "Upgrade now",
    },
    {
      id: "pro",
      name: "Professional Plan",
      price: 160,
      popular: true,
      description: "Advanced features for professionals.",
      ctaLeft: "Current Plan",
      ctaRight: "Upgrade now",
    },
    {
      id: "enterprise",
      name: "Enterprise Plan",
      price: 200,
      popular: true,
      description: "Complete features for teams.",
      ctaLeft: "Current Plan",
      ctaRight: "Upgrade now",
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
  "Priority email support",
  "Advanced analytics dashboard",
  "Custom integrations",
  "Dedicated account manager",
];

function PlanCard({ plan }: { plan: Plan }) {
  return (
    <div className="rounded-2xl p-8 bg-white border border-gray-200 shadow-sm hover:shadow-md ">
      <div className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500 font-normal">{plan.name}</p>
            {plan.popular && (
              <span
                className="border border-blue-100 text-blue-500 px-3 py-1 rounded-full text-xs font-normal shadow-sm"
                style={{
                  boxShadow: "--primary-500 0px 1px 3px 0px",
                }}
              >
                Popular
              </span>
            )}
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-gray-700">
              ${plan.price}
            </span>
            <span className="text-gray-500">
              per {plan.name.includes("Case") ? "Case" : "Month"}
            </span>
          </div>
          <p className="text-gray-500 text-left">{plan.description}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button className="flex-1 rounded-full font-bold bg-gray-50 text-gray-500 px-6 py-3">
            {plan.ctaLeft}
          </button>
          <button className="flex-1 rounded-full font-bold bg-primary-500 text-white px-6 py-3">
            {plan.ctaRight}
          </button>
        </div>

        <div className="border-t border-gray-100 pt-6 text-left">
          <div className="space-y-1 mb-4">
            <p className=" text-gray-700 uppercase tracking-wide  ">
              Features
            </p>
            <p className="text-sm text-gray-500">
              Everything in our free plan plus...
            </p>
          </div>

          <div className="space-y-3">
            {FEATURES.map((feature, i) => (
              <div key={i} className="flex items-start">
                <CircleCheck className="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-500 p-1 pl-2">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MembershipPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <div className="mb-16">
          <h1 className="text-2xl font-semibold text-gray-900">Fees Plan</h1>
        </div>

        <div id="pricing" className="space-y-12">
          <div className="text-center space-y-6">
            <p className="text-blue-500 font-semibold text-sm tracking-wide">
              Pricing
            </p>
            <h2 className="text-xl text-gray-700">
              Choose the Perfect Plan for You
            </h2>

            <Tabs defaultValue="case" className="w-full">
              <div className="flex justify-center mb-12 ">
                <TabsList className="bg-blue-50 h-auto rounded-full">
                  <TabsTrigger
                    value="case"
                    className="px-8 py-2 rounded-full font-bold data-[state=active]:bg-primary-500 data-[state=active]:text-white data-[state=active]:shadow-md"
                  >
                    Per Case
                  </TabsTrigger>
                  <TabsTrigger
                    value="monthly"
                    className="px-8 py-2 rounded-full font-bold data-[state=active]:bg-primary-500 data-[state=active]:text-white data-[state=active]:shadow-md"
                  >
                    Monthly
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="case" className="mt-0">
                <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto">
                  {PLANS_DATA.case.map((plan) => (
                    <PlanCard key={plan.id} plan={plan} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="monthly" className="mt-0">
                <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto">
                  {PLANS_DATA.monthly.map((plan) => (
                    <PlanCard key={plan.id} plan={plan} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </main>
  );
}
