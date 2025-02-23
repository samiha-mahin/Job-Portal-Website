import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="p-5 md:p-6 rounded-lg shadow-lg bg-white border border-gray-200 w-full max-w-lg md:max-w-2xl mx-auto">
      {/* Top Section */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          {daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>

      {/* Company Info */}
      <div className="flex items-center gap-3 my-3">
        <Avatar className="w-12 h-12 md:w-14 md:h-14">
          <AvatarImage src={job?.company?.logo} />
        </Avatar>
        <div>
          <h1 className="font-semibold text-md md:text-lg">{job?.company?.name}</h1>
          <p className="text-sm text-gray-600">{job?.company?.location}</p>
        </div>
      </div>

      {/* Job Title & Description */}
      <div>
        <h1 className="font-bold text-lg md:text-xl my-2">{job?.tittle}</h1>
        <p className="text-sm md:text-base text-gray-600 truncate md:line-clamp-2">{job?.description}</p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mt-4">
        <Badge className="text-green-700 font-bold" variant="ghost">
          {job?.position} Positions
        </Badge>
        <Badge className="text-[#F83002] font-bold" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="text-[#3886c2] font-bold" variant="ghost">
          {job?.salary} LPA
        </Badge>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mt-5">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
          className="w-full sm:w-auto"
        >
          Details
        </Button>
        <Button className="bg-[#3886c2] hover:bg-[#2e648e] w-full sm:w-auto">
          Save for later
        </Button>
      </div>
    </div>
  );
};

export default Job;
