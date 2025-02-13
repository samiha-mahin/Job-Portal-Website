import { Company } from "../models/company_model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";


export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res.status(400).json({
        message: "Company name is required",
        success: false,
      });
    }
    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(400).json({
        message: "You can't register same company",
        success: false,
      });
    }
    company = await Company.create({
      name: companyName,
      userId: req.id,
    });
    return res.status(201).json({
      message: "Company created successfully",
      company,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Registration for company failed",
    });
  }
};

//"getCompany" function is like being a business registry admin:
// 1. A user asks, "What companies have I registered?"
// 2. You identify them using their ID.
// 3. You search your database for all companies linked to that ID.
export const getCompany = async (req, res) => {
  try {
    const userId = req.id;
    const companies = await Company.find({ userId });
    if (!companies) {
      return res.status(404).json({
        message: "Companies Not Found",
        success: false,
      });
    }
    return res.status(200).json({
        companies,
        success:true
    });
  } catch (error) {
    console.log(error);
  }
};
//You’re running a business registry office, and someone comes to your desk asking about a specific company. They give you the company’s registration number (ID) and ask, "Can you tell me about this company?"
//"getCompanyById" function is like being a business registry officer:
//Someone provides a company ID and asks for details.
//You look up the ID in your database:
//If found: You share the company’s details.
//If not: You say, "No company found with this ID."
//If there’s a problem: You log the error and inform them.

export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        message: "Company Not Found",
        success: false,
      });
    }
    return res.status(200).json({
        company,
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};

export const updateCompany = async (req,res)=>{
    try {
        const {name, description, website, location}= req.body;
        const file = req.file;
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        const logo = cloudResponse.secure_url;

        const updateData = {name, description, website, location, logo};

        const company = await Company.findByIdAndUpdate(req.params.id, updateData,{new:true});

        if(!company){
            return res.status(404).json({
                message: "Company Not Found",
                success: false,
              });
        }
        return res.status(200).json({
            message: "Company Information Updated",
            success: true
          });
    } catch (error) {
        console.log(error);
    }
}
