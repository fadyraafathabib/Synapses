import { CheckCircle } from 'lucide-react'
import { Card } from '../ui/card'

export default function ProfileProgress() {
  const steps = [
    {
      title: "Billing method",
      description: "Add your payment method to receive or send payments seamlessly — it only takes a minute",
      imageUrl: "../../../public/cart.png", 
      completed: false,
      color: "blue"
    },
    {
      title: "Verify Email",
      description: "You're almost there! Verify your email to unlock full access and stay updated with job notifications",
      imageUrl: "../../../public/emil.png", 
      completed: true,
      color: "green"
    },
    {
      title: "Verify Phone Number",
      description: "Secure your account and build trust — verify your phone number to get started with confidence",
      imageUrl: "../../../public/phone.png", 
      completed: false,
      color: "blue"
    }
  ]

  const progress = 30

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Complete Your Profile before you can hire</h2>

        <div className="flex flex-col items-center">
          <div className="relative w-16 h-16">
            <div
              className="w-full h-full rounded-full flex items-center justify-center"
              style={{
                background: `conic-gradient(
                  #3b82f6 0deg ${progress * 3.6}deg,
                  #e5e7eb ${progress * 3.6}deg 360deg
                )`,
                padding: '3px'
              }}
            >
              <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-gray-800">
                  {progress}%
                </span>
              </div>
            </div>
          </div>
          <span className="text-sm mt-1">Complete Profile</span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {steps.map((step, i) => (
          <Card
            key={i}
            className={`p-4 ${
              step.completed
                ? 'bg-gray-100 border-gray-200'
                : 'border-blue-200 hover:border-blue-300'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg">
                  <img
                    src={step.imageUrl}
                    alt={step.title}
                    className="h-16 w-16 object-contain"
                  />
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Required to hire</div>
                  <h3 className={`font-semibold ${
                    step.completed ? 'text-gray-900' : 'text-gray-900'
                  }`}>
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
  )
}