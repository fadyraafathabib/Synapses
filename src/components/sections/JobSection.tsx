import JobCard, { type JobCardProps } from './JobCard'
import { Button } from '../ui/button'

interface JobSectionProps {
  title: string
  jobs: JobCardProps[]
}

export default function JobSection({ title, jobs }: JobSectionProps) {
  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <Button variant="link" className="text-primary p-0 h-auto font-normal">
          View All
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {jobs.map((job, i) => (
          <JobCard key={i} {...job} />
        ))}
      </div>
    </section>
  )
}