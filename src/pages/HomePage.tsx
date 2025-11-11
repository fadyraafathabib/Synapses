import Header from "../components/layout/Header";
import ProfileProgress from "../components/sections/ProfileProgress";
import JobSection from "../components/sections/JobSection";

const JOBS = [
  {
    status: "Available" as const,
    postedDate: "12 May 2025",
    title: "Dr. Rachel Jone",
    company: "California, US",
    distance: "3.2 km",
    rating: 4.5,
    reviews: 22,
    pay: "$420",
    schedule: "Full Day - Thursday, June 6, 2025 (9:00 AM - 5:00 PM)",
    description:
      "Looking for a reliable RDA to assist with general procedures and patient prep with 2+ years experience, California RDA license required.",
    proposalsRDA: 22,
    proposalsAnesthesia: 22,
    imageUrl: "../../public/1.jpg",
  },
  {
    status: "Available" as const,
    postedDate: "12 May 2025",
    title: "Dr. Mark Thompson",
    company: "Los Angeles, CA",
    distance: "1.8 km",
    rating: 4.7,
    reviews: 18,
    pay: "$390",
    schedule: "Full Day - Friday, June 7, 2025 (8:30 AM - 4:30 PM)",
    description:
      "Seeking an experienced RDA for a busy orthodontic practice. Must be detail-oriented and great with patients.",
    proposalsRDA: 15,
    proposalsAnesthesia: 8,
    imageUrl: "../../public/2.jpg",
  },
  {
    status: "Urgent Need – Needed within 48 hrs" as const,
    postedDate: "12 May 2025",
    title: "BrightSmile Dental Group",
    company: "San Diego, CA",
    distance: "4.5 km",
    rating: 4.3,
    reviews: 31,
    pay: "$450",
    schedule: "Full Day - Monday, June 10, 2025 (9:00 AM - 5:00 PM)",
    description:
      "Join our team! We need an RDA for surgical assistance. Experience with implants preferred. Fast-paced environment with great team support.",
    proposalsRDA: 27,
    proposalsAnesthesia: 19,
    imageUrl: "../../public/3.jpg",
  },
  {
    status: "Available" as const,
    postedDate: "12 May 2025",
    title: "Dr. Rachel Jone",
    company: "California, US",
    distance: "3.2 km",
    rating: 4.5,
    reviews: 22,
    pay: "$420",
    schedule: "Full Day - Thursday, June 6, 2025 (9:00 AM - 5:00 PM)",
    description:
      "Looking for a reliable RDA to assist with general procedures and patient prep with 2+ years experience, California RDA license required.",
    proposalsRDA: 22,
    proposalsAnesthesia: 22,
    imageUrl: "../../public/1.jpg",
  },
  {
    status: "Available" as const,
    postedDate: "12 May 2025",
    title: "Dr. Rachel Jone",
    company: "California, US",
    distance: "3.2 km",
    rating: 4.5,
    reviews: 22,
    pay: "$420",
    schedule: "Full Day - Thursday, June 6, 2025 (9:00 AM - 5:00 PM)",
    description:
      "Looking for a reliable RDA to assist with general procedures and patient prep with 2+ years experience, California RDA license required.",
    proposalsRDA: 22,
    proposalsAnesthesia: 22,
    imageUrl: "../../public/1.jpg",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white-50 ">
      <Header />

      <div className="container mx-auto px-4 py-6">
          
        <ProfileProgress />

        <JobSection title="Recommended Jobs" jobs={JOBS} />

        <div className="text-center my-6">
          <p className="text-sm text-green-500">Need Extra Help?</p>
          <p className="text-sm text-gray-500">
            Find verified professionals you can hire for your own cases
          </p>
        </div>

        <JobSection title="Jobs nearest to you" jobs={JOBS} />
      </div>
    </main>
  );
}
