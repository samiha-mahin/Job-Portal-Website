import React from 'react'
import JobCards from './JobCards'
import { useSelector } from 'react-redux';
import store from '@/redux/store';

// const randomjobs = [1, 2, 3, 4, 5, 6, 7, 8];

const Latest_jobs = () => {
  const {allJobs} = useSelector(store=>store.job)
  return (
    <div className="flex flex-col items-center max-w-7xl mx-auto my-10 px-4">
    <h1 className="text-3xl font-bold my-10 text-center">
      <span className="text-[#3886c2]">Latest & Top</span> Job Opening
    </h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
      {
        allJobs.length <= 0
          ? <span>No Jobs Available</span>
          : allJobs?.slice(0, 6).map((job) => <JobCards key={job._id} job={job} />)
      }
    </div>
  </div>
  
  )
}

export default Latest_jobs