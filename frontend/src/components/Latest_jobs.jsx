import React from 'react';
import JobCards from './JobCards';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const Latest_jobs = () => {
  const { allJobs } = useSelector(store => store.job);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center max-w-7xl mx-auto my-10 px-4"
    >
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold my-10 text-center"
      >
        <span className="text-[#3886c2]">Latest & Top</span> Job Opening
      </motion.h1>

      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
        }}
      >
        {allJobs.length <= 0 ? (
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false, amount: 0.2 }} transition={{ duration: 0.5 }}>
            No Jobs Available
          </motion.span>
        ) : (
          allJobs.slice(0, 6).map((job) => (
            <motion.div 
              key={job._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.7 }}
            >
              <JobCards job={job} />
            </motion.div>
          ))
        )}
      </motion.div>
    </motion.div>
  );
};

export default Latest_jobs;
