import { User } from "../models/user_model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;
    //if any input were missing
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "Input is missing",
        success: false,
      });
    }
    const file = req.file;
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exists with this email",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile:{
        profilePhoto: cloudResponse.secure_url ,
      }
    });

    return res.status(201).json({
      message: "Account created successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Registration failed",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    //if any input were missing
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Input is missing",
        success: false,
      });
    }

    // Check if the user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }
    // Verify the password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }
    //Check role is correct or not
    if (role !== user.role) {
      return res.status(400).json({
        message: "Account doesn't exists with the current role",
        success: false,
      });
    }
    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,        // ✅ Secure from JavaScript access
        secure: true,          // ✅ Required for HTTPS
        sameSite: "None",      // ✅ Required for cross-site cookies
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        user,
        success: true,
      });
  } catch (error) {
    return res.status(500).json({
      message: "Error Login",
    });
  }
};
export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error Logout",
    });
  }
};
export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;

    const file = req.file;
    console.log("Uploaded file:", req.file);
    if (!file) {
      return res
        .status(400)
        .json({ message: "File not uploaded", success: false });
    }

    const fileUri = getDataUri(file);
    console.log("File URI:", fileUri);
    if (!fileUri.content) {
      return res
        .status(400)
        .json({ message: "Invalid file format", success: false });
    }

    let cloudResponse;
    try {
      cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      console.log("Cloudinary Response:", cloudResponse);
    } catch (error) {
      console.error("Cloudinary Upload Error:", error);
      return res
        .status(500)
        .json({ message: "File upload failed", success: false });
    }

    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",");
    }

    //cloudinary

    const userId = req.id; //middleware authentication
    let user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }

    //updating user

    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;

    if (cloudResponse) {
      user.profile.resume = cloudResponse.secure_url; //save cloudinary url
      user.profile.resumeOriginalName = file.originalname; //save original file name
    }

    await user.save();

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };
    return res.status(200).json({
      message: "Profile updated successfully",
      user,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error Update",
    });
  }
};
