import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";
import JobCard, { type JobCardProps } from "./JobCard";

interface JobCarouselProps {
  jobs: JobCardProps[];
}

export default function JobCarousel({ jobs }: JobCarouselProps) {
  return (
    <Carousel
      opts={{
        align: "start",
        dragFree: false,
        slidesToScroll: 1,
      }}
      className="w-full"
    >
      <CarouselContent className="">
        {" "}
        {jobs.map((job, index) => (
          <CarouselItem
            key={index}
            className=" basis-full sm:basis-1/2 xl:basis-2/7"
          >
            <JobCard {...job} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
