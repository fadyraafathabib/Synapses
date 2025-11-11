import { Briefcase, Clock, Heart, MapPin, Star } from "lucide-react";
import { Button } from "../ui/button";

export interface JobCardProps {
  status: "Available" | "Urgent Need – Needed within 48 hrs";
  postedDate: string;
  title: string;
  company: string;
  distance: string;
  rating: number;
  reviews: number;
  pay: string;
  schedule: string;
  description: string;
  proposalsRDA: number;
  proposalsAnesthesia: number;
  imageUrl: string;
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
  imageUrl,
}: JobCardProps) {
  const isUrgent = status === "Urgent Need – Needed within 48 hrs";

  return (
    <div
      className={`border rounded-xl p-4 hover:shadow-md transition-shadow ${
        isUrgent ? "border-red-200" : "border-gray-200"
      }`}
    >
      <div
        className={`font-normal mb-1 flex items-center justify-between ${
          isUrgent ? "text-red-600" : "text-green-600"
        }`}
      >
        {status}
        <Heart className="h-5 w-5 text-gray-300 hover:text-red-500 cursor-pointer" />
      </div>

      <div className="text-gray-500 text-xs mb-3">Posted {postedDate}</div>

      <div className="flex justify-between items-start mb-3 gap-3">
        <div className="flex items-start gap-3">
          <img
            src={imageUrl || "/placeholder.svg"}
            alt={company}
            className="w-16 h-16 rounded-full object-cover border border-gray-200 flex-shrink-0"
          />
          <div className="min-w-0">
            <h3 className="font-semibold text-sm">{title}</h3>
            <div className="flex items-center gap-1 text-gray-600 mb-1 text-xs">
              <MapPin className="h-3 w-3 text-gray-500 flex-shrink-0" />
              <span>
                {company} — {distance} away
              </span>
            </div>
            <div className="flex items-center gap-1 text-gray-600 mb-2 text-xs">
              <Briefcase className="h-3 w-3 text-gray-500 flex-shrink-0" />
              <span>Registered Dental Assistant Needed</span>
            </div>
            <div className="flex items-center gap-1 text-xs">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span>
                {rating} ({reviews} Reviews)
              </span>
              <span className="text-gray-500">•</span>
              <span>{pay} / Full Day</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1 mb-3 text-xs text-gray-500">
        <Clock className="h-3 w-3 text-gray-500 flex-shrink-0" />
        <span>{schedule}</span>
      </div>

      <div className="mb-3">
        <p className="font-medium text-gray-700 mb-1 text-xs">Description</p>
        <p className="text-xs text-gray-800 leading-relaxed">{description}</p>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-3 text-xs text-gray-500">
        <span>Proposals: {proposalsRDA} to RDA</span>
        <span>Proposals: {proposalsAnesthesia} for Anesthesia</span>
      </div>

      <Button className="w-full py-2 rounded-full font-semibold bg-gray-100 text-blue-600 text-sm hover:bg-blue-600 hover:text-white transition-colors">
        Apply Now
      </Button>
    </div>
  );
}
