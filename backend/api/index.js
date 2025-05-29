// File: api/index.js
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "../utils/db.js";
import userRoute from "../routes/user_route.js";
import companyRoute from "../routes/company_route.js";
import jobRoute from "../routes/job_route.js";
import applicationRoute from "../routes/application_route.js";
import serverless from "serverless-http";

// Load env variables
dotenv.config();

const app = express();

// Connect to DB
connectDB();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: "https://job-portal-website-front-end-e72p.vercel.app",
  credentials: true,
};
app.use(cors(corsOptions));

// API Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/app", applicationRoute);

// Export the serverless handler
export const handler = serverless(app);
