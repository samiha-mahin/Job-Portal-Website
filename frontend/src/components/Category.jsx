import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
];

const Category = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };
  return (
    <div className="flex flex-col items-center gap-5 max-w-7xl mx-auto my-10 px-4">
    {/* Title */}
    <h1 className="text-2xl md:text-3xl font-bold text-center">
      Easy Steps To Get Your <span className="text-[#3886c2]">Dream Job In Our Platform</span>
    </h1>
  
    {/* Description */}
    <p className="text-center text-sm md:text-lg max-w-2xl">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consectetur
      illo in, ex quae molestias non.
    </p>
  
    {/* Responsive Carousel */}
    <Carousel className="w-full max-w-xl mx-auto my-10">
      <CarouselContent>
        {category.map((cat, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg-basis-1/3 sm:basis-1/4">
            <Button
              onClick={() => searchJobHandler(cat)}
              variant="outline"
              className="w-full rounded-full text-sm md:text-base"
            >
              {cat}
            </Button>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  </div>
  
  );
};

export default Category;
