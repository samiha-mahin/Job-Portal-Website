import { Application } from "../models/application_model.js";
import { Job } from "../models/job_model.js";

export const applyJob = async (req, res) => {
  try {
    const userId = req.id; // User ID from authentication middleware
    const jobId = req.params.id; // Job ID from the request parameter
    //jobId is like the job posting number that you see on the portal for a specific role.
    if (!jobId) {
      return res.status(400).json({
        message: "job Id is required",
        success: false,
      });
    }
    //check if user already applied for the job
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this jobs",
        success: false,
      });
    }
    //check if the jobs exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Job not found bitch!",
        success: false,
      });
    }
    //create new application
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    }); //Now, the system creates a record for your job application in its database. This record links your User ID and the Job ID together

    job.applications.push(newApplication._id); //The job.applications field is an array in the Job model. It stores the IDs of all applications made for that specific job.newApplication._id is the unique identifier (_id) of the application we just created. This line adds the application’s ID to the applications array of the job.

    await job.save();
    return res.status(201).json({
      message: "'Job applied successfully' no jokes!",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

//This function, getAppliedJobs, retrieves all jobs a user has applied for, sorted by the most recently created ones, including detailed information about the jobs and the companies offering them.

export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;//This ID is used to filter applications submitted by the logged-in user.

    const application = await Application.find({ applicant: userId }) 
      .sort({ createdAT: -1 })  //Ensures the most recent applications are shown first.
      .populate({
        path: "job",
        options: { sort: { createdAT: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAT: -1 } },
        },
      }); // This fetches all applications made by the user
    if (!application) {
      return res.status(404).json({
        message: "No applications!",
        success: false,
      });
    }
    return res.status(200).json({
      application,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

//This function, getApplicants , is used to retrieve all applicants for a specific job. The admin needs to provide the jobId in the request.

export const getApplicants = async (req,res) =>{
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:'applications',
            options: { sort: { createdAT: -1 } },
            populate:{
                path:'applicant'
            }
        });
        if (!job) {
            return res.status(404).json({
              message: "Job not found bitch!",
              success: false,
            });
        }
        return res.status(200).json({
            job,
            success: true,
          });
    } catch (error) {
        console.log(error);
    }
};
export const updateStatus = async (req,res)=>{
    try {
        const {status} = req.body;
        const applicationId = req.params.id;
        if(!status){
            return res.status(400).json({
                message: "status is required",
                success: false
            });
        }
        //find the application by application id
        const application = await Application.findOne({_id:applicationId});
        if (!application) {
            return res.status(404).json({
              message: "Application not found!",
              success: false,
            });
        }    
        //update the status
        application.status = status.toLowerCase();//(status.toLowerCase() ensures it's in lowercase for consistency)
        await application.save();

        return res.status(200).json({
            message: "Status updated sucessfully",
            success: true,
          });
    } catch (error) {
        console.log(error);
    }
}