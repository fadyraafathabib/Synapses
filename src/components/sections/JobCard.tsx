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
      className={` border rounded-xl p-4 hover:shadow-md transition-shadow ${
        isUrgent ? "border-red-200" : "border-gray-200"
      }`}
    >
      <div
        className={`font-normal mb-1 flex items-center justify-between ${
          isUrgent ? "text-red-300" : "text-green-500"
        }`}
      >
        {status}
        <Heart className="h-5 w-5 text-gray-500 hover:text-red-300 cursor-pointer" />
      </div>

      <div className="text-gray-500 text-sm mb-3">
        Posted {postedDate}
      </div>

      <div className="flex justify-between items-start mb-3 gap-3">
        <div className="flex items-start gap-3">
          <img
            src={imageUrl || "/placeholder.svg"}
            alt={company}
            className="w-16 h-16 rounded-full object-cover border border-gray-200 flex-shrink-0"
          />
          <div className="min-w-0">
            <h3 className="font-bold text-gray-900">{title}</h3>
            <div className="flex items-center gap-1 text-gray-500 mb-1 text-xs">
              <MapPin className="h-3 w-3 flex-shrink-0" />
              <span>
                {company} — {distance} away
              </span>
            </div>
            <div className="flex items-center gap-1 text-gray-500 mb-2 text-xs">
              <Briefcase className="h-3 w-3 flex-shrink-0" />
              <span>Registecolor-red Dental Assistant Needed</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500 ">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span>
                {rating} ({reviews} Reviews)
              </span>
              <span>{pay} / Full Day</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1 mb-3 text-xs text-gray-500">
        <Clock className="h-3 w-3 flex-shrink-0" />
        <span>{schedule}</span>
      </div>

      <div className="mb-3">
        <p className="font-medium text-gray-700 mb-1 text-sm">
          Description
        </p>
        <p className="text-xs leading-relaxed text-gray-500">
          {description}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-3 text-ms text-color-gray-500">
        <div className="flex items-center">
          <span className="text-gray-700 text-sm font-medium mr-1">
            Proposals:
          </span>
          <div className="text-xs text-gray-500">
            {proposalsRDA} to RDA
          </div>
        </div>

        <div className="flex items-center">
          <span className="text-gray-700 text-sm font-medium mr-1">
            Proposals:
          </span>
          <div className="text-xs text-gray-500">
            {proposalsAnesthesia} for Anesthesia
          </div>
        </div>
      </div>

      <Button className="w-full py-2 border bg-gray-200 rounded-full font-semibold bg-color-gray-100 text-primary-500 text-sm hover:bg-primary-500 hover:text-white transition-colors">
        Apply Now
      </Button>
    </div>
  );
}
