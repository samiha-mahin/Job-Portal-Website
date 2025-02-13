import {Job} from "../models/job_model.js";

//admin will post
export const postJob = async (req,res)=>{
    try {
        const {tittle,description,requirements,salary,location,jobType,experience,position,companyId} = req.body;
        const userId = req.id;
        if(!tittle || !description || !requirements || !salary || !location || !jobType || !experience ||!position || !companyId){
            return res.status(400).json({
                message: "Input is missing",
                success: false,
            });
        }
        const job = await Job.create({
            tittle,
            description,
            requirements : requirements.split(","),
            salary : Number (salary),
            location,
            jobType,
            experienceLevel : experience,
            position,
            company : companyId,
            created_by : userId
        });
        return res.status(201).json({
            message: "New job created successfully!",
            job,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

//user will get data
//'getAllJobs' this part of the code is responsible for searching jobs based on a keyword provided in the request query. Let’s break it down in simple terms:
//   Request URL: /api/v1/jobs?keyword=developer
//     Here, req.query.keyword will be "developer".

export const getAllJobs = async (req,res)=>{
    try {
       const keyword = req.query.keyword || ""; 
       const query = {
        $or:[
            {tittle:{$regex:keyword, $options: "i"}},
            {description:{$regex:keyword, $options: "i"}},
            //regex means regular expression ,it will search for keywords and $options: "i" makes the search case-insensitive For example, it treats "developer", "Developer", and "DEVELOPER" as the same.
        ]
       };
       const jobs = await Job.find(query).populate({
        path:"company"
       }).sort({createdAt: -1});
       //Instead of returning just the ObjectId stored in the Company field, populate fetches the actual data from the referenced Company collection.
       //({createdAt: -1}): After populating, the jobs are sorted in descending order of their creation time (createdAt), showing the most recently created jobs first.

       if(!jobs){
        return res.status(404).json({
            message: "Jobs Not Found",
            success: false,
          });
       }
       return res.status(200).json({
        jobs,
        success: true
      });
    } catch (error) {
        console.log(error)
    }
}

//user will get data
//Imagine you click on a job listing titled "Backend Developer". The URL for the listing might look like "/jobs/12345".Here, 12345 is the unique identifier for that job.The system uses the 12345 ID to search the database for that specific job.If found, the system returns the job details.If there’s no job with ID 12345, the system informs you that the job doesn’t exist (404 error).If the job is found, the system sends the details (title, description, company, etc.) back to you.

export const getJobById = async (req,res) =>{
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:"applications",
        });
        if(!job){
            return res.status(404).json({
                message: "Job Not Found",
                success: false,
              });
        }
        return res.status(200).json({
            job,
            success: true
          });
    } catch (error) {
        console.log(error)
    }
}
//how many job admin has created till now
export const getAdminJobs = async (req,res) =>{
    try {
        const adminId = req.id;
        const jobs = await Job.find({created_by:adminId}).populate({
            path:"company",
            createdAt: -1
        });
        if(!jobs){
            return res.status(404).json({
                message: "Job Not Found",
                success: false,
              });
        }
        return res.status(200).json({
            jobs,
            success: true
          });
    } catch (error) {
        console.log(error)
    }
}