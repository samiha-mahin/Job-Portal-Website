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

  const searchJobHandler = ()=>{
    dispatch(setSearchedQuery(query));
    navigate("/browse")
  }
  return (
    <div className="text-center">
      <div className="flex flex-col gap-5 my-10">
        <span className="mx-auto px-4 py-2 rounded-full text-center bg-gray-100 text-[#3886c2] font-medium">
          A Best Job Hunt Website
        </span>
        <h1 className="text-4xl font-bold">
          Search, Apply & <br />
          Get Your <span className="text-[#1d5c8d]">Dream Jobs</span>
        </h1>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consectetur
          illo in, ex quae molestias non.
        </p>
        <div className="flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto">
          <input
            type="text"
            placeholder="Find Your Dream Jobs"
            className="outline-none border-none w-full"
          />
          <Button onClick={searchJobHandler} className="rounded-r-full bg-[#3886c2] hover:bg-[#2e648e]">
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
