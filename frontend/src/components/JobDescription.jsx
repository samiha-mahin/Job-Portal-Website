import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { APPLICATION_API, JOB_API } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "@/redux/jobSlice";
import { toast } from "sonner";



const JobDescription = () => {
    const {singleJob} = useSelector(store=>store.job);
    const {user} = useSelector(store=>store.auth);

    const isInitiallyApply = singleJob?.applications?.some(application=>application.applicant === user?._id)||false;
    const [isApply, setIsApply] = useState(isInitiallyApply);
   
    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const jobHandler = async()=>{
      try {
        const res = await axios.get(`${APPLICATION_API}/apply/${jobId}`,{withCredentials:true});
        console.log(res.data);
        if(res.data.success){
          setIsApply(true); //update the local state to prevent multiple application
          const updateSingleJob = {...singleJob,applications:[...singleJob.applications,{applicant:user?._id}]};
          dispatch(setSingleJob(updateSingleJob));//update the redux store and ui
          toast.success(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    }
  
    useEffect(()=>{
      const fecthSingleJob = async()=>{
          try {
              const res = await axios.get(`${JOB_API}/get/${jobId}`,{withCredentials:true});
              if(res.data.success){
                  dispatch(setSingleJob(res.data.job));
                  setIsApply(res.data.job.applications.some(application=>application.applicant === user?._id)); //check if user already applied
              }
          } catch (error) {
              console.log(error);
          }
      }
      fecthSingleJob();
   },[jobId,dispatch,user?._id]);

  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl ">{singleJob?.tittle}</h1>
          <div className="flex items-center gap-2 mt-4">
            <Badge className={"text-green-700 font-bold"} variant="ghost">{setSingleJob?.position} Positions</Badge>
            <Badge className={"text-[#F83002] font-bold"} variant="ghost">{singleJob?.jobType}</Badge>
            <Badge className={"text-[#3886c2] font-bold"} variant="ghost">{singleJob?.salary} LPA</Badge>
          </div>
        </div>
        <Button 
          onClick={isApply?null:jobHandler}
        disabled={isApply} className={`rounded-lg ${isApply?'bg-[#2e648e] hover:bg-[#2e648e] cursor-not-allowed':'bg-[#3886c2] hover:bg-[#2e648e]'}`}>{isApply? 'Applied' : 'Apply Now'}
        </Button>
      </div>
      <h1 className="border-b-2 border-b-gray-300 font-medium py-4">Job Description</h1>
      <div>
        <h1 className="font-bold my-1">Role: <span className="pl-4 font-normal text-gray-800">{singleJob?.tittle}</span></h1>
        <h1 className="font-bold my-1">Location: <span className="pl-4 font-normal text-gray-800">{singleJob?.location}</span></h1>
        <h1 className="font-bold my-1">Description: <span className="pl-4 font-normal text-gray-800">{singleJob?.description}</span></h1>
        <h1 className="font-bold my-1">Experience: <span className="pl-4 font-normal text-gray-800">{singleJob?.experienceLevel}</span></h1>
        <h1 className="font-bold my-1">Salary: <span className="pl-4 font-normal text-gray-800">{singleJob?.salary} LPA</span></h1>
        <h1 className="font-bold my-1">Applicant: <span className="pl-4 font-normal text-gray-800">{singleJob?.applications?.length}</span></h1>
        <h1 className="font-bold my-1">Posted Date: <span className="pl-4 font-normal text-gray-800">{singleJob?.createdAt.split("T")[0]}</span></h1>
      </div>
    </div>
  );
};

export default JobDescription;
