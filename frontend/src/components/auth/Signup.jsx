import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import store from "@/redux/store";
import { Loader2 } from "lucide-react";
import Footer from "../shared/Footer";

const Signup = () => {
    const [input, setInput] = useState({
        fullname:"",
        email:"",
        phoneNumber:"",
        password:"",
        role:"",
        file:"",
    })
    const {loading} = useSelector(store=>store.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const eventHandler = (e)=>{
        setInput ({...input,
            [e.target.name]:e.target.value});
    }
    const fileHandler = (e)=>{
        setInput ({...input, 
            file:e.target.files?.[0]}); 
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            dispatch(setLoading(true))
            const res = await axios.post(`${USER_API}/register`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message || "Signup successful!");
            }
        } catch (error) {
            console.log(error); // Debugging purposes
            const errorMessage =
                error.response?.data?.message || "An unexpected error occurred.";
            toast.error(errorMessage);
        } finally {
            dispatch(setLoading(false))
        }
    };    
  return (
    <div>
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10 shadow-xl"
        >
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>
          <div className="my-2">
            <Label>Full Name</Label>
            <Input type="text" 
             name="fullname"
             value={input.fullname}
             onChange={eventHandler}
            placeholder="enter fullname" />
          </div>
          <div className="my-2">
            <Label>Email</Label>
            <Input type="email" 
             name="email"
             value={input.email}
             onChange={eventHandler}
            placeholder="email" />
          </div>
          <div className="my-2">
            <Label>Phone Number</Label>
            <Input type="phoneNumber" 
             name="phoneNumber"
             value={input.phoneNumber}
             onChange={eventHandler}
            placeholder="" />
          </div>
          <div className="my-2">
            <Label>Password</Label>
            <Input type="password"
             name="password"
             value={input.password}
             onChange={eventHandler} 
            placeholder="enter password" />
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input
                type="radio"
                name="role"
                value="student"
                checked = {input.role =='student'}
                onChange = {eventHandler}
                className="cursor-pointer"/>
                <Label htmlFor="option-one">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
              <Input
                type="radio"
                name="role"
                value="recruiter"
                checked = {input.role =='recruiter'}
                onChange = {eventHandler}
                className="cursor-pointer"/>
                <Label htmlFor="option-two">Recruiter</Label>
              </div>
            </RadioGroup>
            <div className="flex items-center gap-2">
                <Label>Profile</Label>
                <Input
                   accept="image/*"
                   type="file"
                   onChange = {fileHandler}
                   className="cursor-pointer"/>
            </div>
          </div>
          {
            loading ?  <Button  className="w-full my-4"><Loader2 className="mr-2 h-4 animate-spin"/>Please Wait</Button> : <Button type="Submit" className="w-full my-4">Login</Button>
          }
          <span className="text-sm">Already have an account? <Link to="/login" className="text-blue-500">Login</Link></span>
        </form>
      </div>
      <Footer/>
    </div>
  );
};

export default Signup;
