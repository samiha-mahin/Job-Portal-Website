import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";

const Hero = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };
  return (
    <div
      className="h-[70vh] md:h-[80vh] w-[90%] md:w-[85%] mx-auto flex items-center justify-center 
    bg-cover md:bg-cover bg-center rounded-3xl px-4"
      style={{
        backgroundImage: "url('/images/blue.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col items-center gap-5 text-center my-10 w-full px-4">
        {/* Tagline */}
        <span className="px-4 py-2 rounded-full bg-gray-100 text-[#3886c2] font-medium text-sm md:text-base">
          A Best Job Hunt Website
        </span>

        {/* Heading */}
        <h1 className="text-3xl md:text-5xl font-bold leading-tight">
          Search, Apply & <br />
          Get Your <span className="text-[#1d5c8d]">Dream Jobs</span>
        </h1>

        {/* Description */}
        <p className="text-sm md:text-lg max-w-2xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
          illo in, ex quae molestias non.
        </p>

        {/* Search Bar */}
        <div className="flex bg-white w-full sm:w-[80%] md:w-[60%] lg:w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-2">
          <input
            type="text"
            placeholder="Find Your Dream Jobs"
            className="outline-none border-none w-full bg-transparent px-3 text-black text-sm md:text-base"
          />
          <Button
            onClick={searchJobHandler}
            className="rounded-r-full bg-[#3886c2] hover:bg-[#2e648e] px-4 py-2"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
