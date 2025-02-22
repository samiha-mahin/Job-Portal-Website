import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user_route.js";
import companyRoute from "./routes/company_route.js";
import jobRoute from "./routes/job_route.js"
import applicationRoute from "./routes/application_route.js"
dotenv.config({});

 const app = express();

 //middlewares
 app.use(express.json()); //Parses JSON payloads from request body.
 app.use(express.urlencoded({extended:true})); //Parses URL-encoded payloads (e.g., forms).
 app.use(cookieParser()); //Parses cookies from incoming HTTP requests

 const corsOptions = {
   origin: 'https://job-portal-website-front-end-e72p-6h93luulk.vercel.app/', // Frontend URL
   credentials: true, // Ensures cookies are sent
 };
 app.use(cors(corsOptions));
 
 //api's

 app.use("/api/v1/user",userRoute);
 app.use("/api/v1/company",companyRoute);
 app.use("/api/v1/job",jobRoute);
 app.use("/api/v1/app",applicationRoute);


 const PORT = process.env.PORT || 3000;
 app.listen (PORT,()=>{
    connectDB();
    console.log(`Server Running at Port ${PORT}`);
 })