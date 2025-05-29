import React from "react";
import Mapbox from "./Mapbox";

const About = () => {
  return (
    <div>
      <div className="flex flex-col items-center gap-5 max-w-7xl mx-auto my-10 px-4">
        <h1 className="text-4xl font-bold my-5 text-center">
          About <span className="text-[#3886c2]">Us</span>
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-5">
          <img
            src="/images/About.png"
            alt="Dream Job"
            className="w-full md:w-1/2 max-w-md rounded-lg shadow-lg"
          />
          <p className="text-center md:text-left text-lg leading-relaxed">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            <br />
            Consectetur illo in, ex quae molestias non.
          </p>
        </div>
      </div>
      <h1 className="text-4xl font-bold my-5 text-center">
          Select <span className="text-[#3886c2]">Location</span>
        </h1>
     <div className="w-[85%] mx-auto px-4">
      <Mapbox/>
     </div>
    </div>
  );
};

export default About;
