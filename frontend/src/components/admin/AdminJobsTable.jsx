import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal, Search } from "lucide-react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

const AdminJobsTable = () => {
  const { companies, searchCompanyByText} = useSelector((store) => store.company);
  const {allAdminJobs,searchJobByText} = useSelector((store) => store.job);
  const navigate = useNavigate();
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);

  useEffect(()=>{
    const filteredJob = allAdminJobs.length >= 0 && allAdminJobs.filter((job)=>{
        if(!searchJobByText){
            return true
        };
        return job?.tittle?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase()) ;

    });
    setFilterJobs(filteredJob);
},[allAdminJobs,searchJobByText])

  return (
    <div>
      <Table>
        <TableCaption>A list of your posted jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs.map((job) => (
            <tr>
              
              <TableCell>{job?.company?.name}</TableCell>
              <TableCell>{job?.tittle}</TableCell>
              <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
              <TableCell className="text-right cursor-pointer">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="w-32">
                    <div className="flex flex-col items-center gap-2 w-fit cursor-pointer">
                      <div
                        onClick={() =>
                          navigate(`/admin/jobs/${job._id}`)
                        }
                        className="flex items-center gap-2 w-fit cursor-pointer"
                      >
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                      <div onClick={()=>navigate(`/admin/jobs/${job._id}/applicants`)} className="flex items-center w-fit cursor-pointer gap-2 mt-2">
                        <Eye className="w-4"/>
                        <span>Applicants</span>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </tr>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;


