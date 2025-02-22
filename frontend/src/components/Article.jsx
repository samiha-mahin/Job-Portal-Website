import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

const jobArticles = [
  {
    title: "The Future of Remote Work",
    description:
      "Discover how remote work is changing industries and what to expect in the future.",
    link: "#",
  },
  {
    title: "Top Skills Employers Seek in 2025",
    description:
      "Stay ahead of the curve with these must-have skills for job seekers.",
    link: "#",
  },
  {
    title: "Navigating the Job Market After Graduation",
    description:
      "Tips and tricks to land your dream job after completing your studies.",
    link: "#",
  },
];

const Article = () => {
  return (
    <div className="w-[90%] md:w-[70%] mx-auto">
      <div className="mt-10 text-left">
        <h3 className="text-2xl font-semibold mb-4 my-10">Latest Job Articles</h3>
        <Carousel className="w-full max-w-6xl mx-auto my-10">
          <CarouselContent  className="flex gap-4">
            {jobArticles.map((article, index) => (
              <CarouselItem key={index} className="flex flex-col items-center p-6 border rounded-lg shadow-md bg-white md:basis-1/2 lg-basis-1/3 sm:basis-1/4">
                <h4 className="text-xl font-bold mb-2">{article.title}</h4>
                <p className="text-gray-600 mb-4">{article.description}</p>
                <Button variant="outline" className="w-auto rounded-full text-sm md:text-base">
                View More
                </Button>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0" />
          <CarouselNext className="right-0" />
        </Carousel>
      </div>
    </div>
  );
};

export default Article;

