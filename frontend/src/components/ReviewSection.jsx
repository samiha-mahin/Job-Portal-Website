import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const reviews = [
  {
    id: 1,
    name: "Alice Johnson",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    review:
      "This job portal is amazing! It helped me find my dream job quickly and efficiently.",
  },
  {
    id: 2,
    name: "Michael Smith",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    review:
      "Great user experience and a wide range of job listings. Highly recommended!",
  },
  {
    id: 3,
    name: "Sophia Martinez",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    review:
      "I love how easy it is to navigate and apply for jobs. A fantastic platform!",
  },
  {
    id: 3,
    name: "Alexa Johnson",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
    review: " A fantastic platform!",
  },
];

const ReviewSection = () => {
  return (
    <div className="max-w-7xl mx-auto py-10 px-4 text-center">
      <h2 className="text-3xl font-bold mb-6">
        What Our Users<span className="text-[#3886c2]"> Say About Us</span>
      </h2>
      <Carousel className="w-full max-w-2xl mx-auto my-10">
        <CarouselContent className="flex gap-4">
          {reviews.map((review) => (
            <CarouselItem
              key={review.id}
              className="flex flex-col items-center p-6 border rounded-lg shadow-md bg-white md:basis-1/2 lg-basis-1/3 sm:basis-1/4"
            >
              <Avatar className="w-16 h-16 mb-4">
                <AvatarImage src={review.image} />
                <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <p className="text-lg font-semibold">{review.name}</p>
              <p className="text-gray-600 mt-2">"{review.review}"</p>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0" />
        <CarouselNext className="right-0" />
      </Carousel>
    </div>
  );
};

export default ReviewSection;
