import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";

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
        <h1 className="text-4xl font-bold my-5 text-center">
          Latest Job <span className="text-[#3886c2]">Article</span>
        </h1>
        <Carousel className="w-full max-w-6xl mx-auto my-10">
          <CarouselContent className="flex gap-4">
            {jobArticles.map((article, index) => (
              <CarouselItem
                key={index}
                className="flex flex-col items-center p-6 border rounded-lg shadow-md bg-white md:basis-1/2 lg-basis-1/3 sm:basis-1/4"
              >
                <h4 className="text-xl font-bold mb-2">{article.title}</h4>
                <p className="text-gray-600 mb-4">{article.description}</p>
                <Button
                  variant="outline"
                  className="w-auto rounded-full text-sm md:text-base"
                >
                  View More
                </Button>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0" />
          <CarouselNext className="right-0" />
        </Carousel>
      </div>
      <div className="flex flex-col md:flex-row w-full max-w-6xl mx-auto items-stretch">
  {/* Image Section */}
  <div className="w-full md:w-1/2 h-64 md:h-auto">
    <img
      src="/images/Article.png"
      alt="Dream Job"
      className="w-full h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-tr-none shadow-lg"
    />
  </div>

  {/* Newsletter Section */}
  <div
    className="flex flex-col items-center justify-center w-full md:w-1/2 bg-[#1d5c8d] 
                rounded-b-lg md:rounded-r-lg p-6 md:p-12"
  >
    <h1 className="text-lg sm:text-xl md:text-2xl text-white font-semibold text-center px-4">
      Subscribe to Our Newsletter & Get Daily Job Alerts!
    </h1>

    <div
      className="flex bg-white w-full sm:w-[80%] md:w-[80%] lg:w-[70%] shadow-lg border border-gray-200 
                 mt-6 rounded-full items-center gap-2 max-w-[500px] "
    >
      <input
        type="email"
        placeholder="Enter Email"
        className="px-3 outline-none border-none w-full bg-transparent text-black text-sm md:text-base "
      />
      <Button className="rounded-r-full bg-[#3886c2] hover:bg-[#2e648e] text-white">
        Subscribe
      </Button>
    </div>
  </div>
</div>

    </div>
  );
};

export default Article;
