import * as React from "react";
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
      <CarouselContent className="-ml-2 gap-2">
        {" "}
        {/* ← أضفنا gap-2 هنا */}
        {jobs.map((job, index) => (
          <CarouselItem
            key={index}
            className="pl-2 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/3"
          >
            <JobCard {...job} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
