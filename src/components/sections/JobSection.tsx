
import { type JobCardProps } from "./JobCard";


import JobCarousel from "./JobCarousel";
import { Button } from "../ui/button";

export interface JobSectionProps {
  title: string;
  jobs: JobCardProps[];
}

export default function JobSection({ title, jobs }: JobSectionProps) {
  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-[var(--gray-900)]">
          {title}
        </h2>
        <Button
          variant="link"
          className="text-[var(--gray-900)] p-0 h-auto font-bold text-base"
        >
          View All
        </Button>
      </div>

      <JobCarousel jobs={jobs} />
    </section>
  );
}