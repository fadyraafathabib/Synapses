import { Briefcase, Clock, Heart, MapPin, Star } from 'lucide-react'
import { Button } from '../ui/button'

interface JobCardProps {
  status: "Available" | "Urgent Need – Needed within 48 hrs"
  postedDate: string
  title: string
  company: string
  distance: string
  rating: number
  reviews: number
  pay: string
  schedule: string
  description: string
  proposalsRDA: number
  proposalsAnesthesia: number
  imageUrl: string
}

export default function JobCard({
  status,
  postedDate,
  title,
  company,
  distance,
  rating,
  reviews,
  pay,
  schedule,
  description,
  proposalsRDA,
  proposalsAnesthesia,
  imageUrl
}: JobCardProps) {
  const isUrgent = status === "Urgent Need – Needed within 48 hrs"

  return (
    <div className={`border rounded-xl p-4 hover:shadow-md transition-shadow ${isUrgent ? 'border-red-200' : ''}`}>
      <div className={`text-xs font-medium mb-1 ${isUrgent ? 'text-red-600' : 'text-green-600'}`}>
        {status}
      </div>

      <div className="text-xs text-gray-500 mb-3">Posted {postedDate}</div>

      <div className="flex justify-between items-start mb-3">
        <div className="flex items-start gap-3">
          <img
            src={imageUrl}
            alt={company}
            className="w-16 h-16 rounded-full object-cover border border-gray-200"
          />
          <div>
            <h3 className="font-semibold text-sm">{title}</h3>
            <div className="flex items-center gap-1 text-xs text-gray-600 mb-1">
              <MapPin className="h-3 w-3 text-gray-500 shrink-0" />
              <span>{company} — {distance} away</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-600 mb-2">
              <Briefcase className="h-3 w-3 text-gray-500 shrink-0" />
              <span>Registered Dental Assistant Needed</span>
            </div>
            <div className="flex items-center gap-1">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-xs">{rating} ({reviews} Reviews)</span>
          <span className="text-xs text-gray-500">•</span>
        <span className="text-xs">{pay} / Full Day</span>
        </div>        
        
          </div>
        </div>
        <Heart className="h-5 w-5 text-gray-300 hover:text-red-500 cursor-pointer" />
      </div>

      

       <div className="flex items-center gap-1 mb-3 text-xs text-gray-500">
        <Clock className="h-3 w-3 text-gray-500 shrink-0" />
        <span>{schedule}</span>
      </div>

      <div className="mb-3">
        <p className="text-xs font-medium text-gray-700 mb-1">Description</p>
        <p className="text-sm text-gray-800 leading-tight">{description}</p>
      </div>

      <div className="flex justify-between items-center mb-3 text-xs text-gray-500">
        <span>Proposals: {proposalsRDA} to RDA</span>
        <span>Proposals: {proposalsAnesthesia} for Anesthesia</span>
      </div>

      <Button
        variant={isUrgent ? "default" : "outline"}
        className={`w-full ${
          isUrgent
            ? 'bg-blue-600 hover:bg-blue-700 text-white'
            : 'border-gray-300 text-blue-600 hover:bg-blue-50 hover:text-blue-700'
        }`}
      >
        Apply Now
      </Button>
    </div>
  )
}