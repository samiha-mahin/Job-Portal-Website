import React from "react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage } from "./ui/avatar";

const JobCards = ({ job }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="p-5 sm:p-6 md:p-8 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer w-full max-w-md mx-auto"
    >
      <Avatar className="w-12 h-12 md:w-14 md:h-14">
        <AvatarImage src={job?.company?.logo} />
      </Avatar>
      <div>
        <h1 className="font-medium text-lg">{job?.company?.name}</h1>
        <p className="text-sm text-gray-500">Bangladesh</p>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">{job?.tittle}</h1>
        <p className="text-sm text-gray-600">{job?.description}</p>
      </div>
      <div className="flex flex-wrap items-center gap-2 mt-4">
        <Badge className="text-green-700 font-bold" variant="ghost">
          {job?.position} Position
        </Badge>
        <Badge className="text-[#F83002] font-bold" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="text-[#3886c2] font-bold" variant="ghost">
          {job?.salary} LPA
        </Badge>
      </div>
    </div>
  );
};

export default JobCards;
