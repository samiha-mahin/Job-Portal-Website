import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJob";

const isResume = true;

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-300 rounded-2xl my-5 px-4 py-6 md:p-6">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Avatar className="h-20 w-20 md:h-24 md:w-24">
              <AvatarImage src={user?.profile?.profilePhoto} />
            </Avatar>
            <div className="text-center sm:text-left">
              <h1 className="text-lg md:text-xl font-medium">{user?.fullname}</h1>
              <p className="text-gray-600 text-sm">{user?.profile?.bio}</p>
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              onClick={() => setOpen(true)}
              className="text-right"
              variant="outline"
            >
              <Pen />
            </Button>
          </div>
        </div>

        <div className="my-6 space-y-3 text-sm md:text-base">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Contact className="w-4 h-4" />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>

        <div className="mt-6">
          <h1 className="text-lg md:text-xl font-medium mb-2">Skills</h1>
          <div className="flex flex-wrap gap-2">
            {user?.profile?.skills.length !== 0 ? (
              user?.profile?.skills.map((item, index) => (
                <Badge key={index}> {item} </Badge>
              ))
            ) : (
              <p className="text-sm text-gray-500">N/A</p>
            )}
          </div>

          <div className="grid w-full max-w-sm items-start gap-1.5 mt-5">
            <Label className="text-md font-bold">Resume</Label>
            {isResume && user?.profile?.resume ? (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={user.profile.resume}
                className="text-blue-500 hover:underline break-words"
              >
                {user.profile.resumeOriginalName || "Download Resume"}
              </a>
            ) : (
              <p className="text-sm text-gray-500">No resume available</p>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-2xl p-4 md:p-6">
        <h1 className="text-lg md:text-2xl font-medium mb-4">Applied Jobs</h1>
        <AppliedJobTable />
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
