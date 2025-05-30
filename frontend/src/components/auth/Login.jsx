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
import { setLoading, setUser } from "@/redux/authSlice";
import store from "@/redux/store";
import { Loader2 } from "lucide-react";
import Footer from "../shared/Footer";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const { loading } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const eventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const submitHandler = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    try {
      dispatch(setLoading(true));
      const res = await axios.post(
        `${USER_API}/login`,
        input, // Send input as JSON
        {
          headers: {
            "Content-Type": "application/json", // JSON content type
          },
          withCredentials: true, // To include cookies with the request
        }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user)); // Set user in the redux store
        navigate("/"); // Redirect on success
        toast.success(res.data.message); // Show success toast
      } else {
        toast.error(res.data.message); // Handle unsuccessful login
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        toast.error(error.response.data.message); // Error from the backend
      } else {
        toast.error("Something went wrong!"); // Catch any other errors
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center max-w-7xl mx-auto px-4">
        <form
          onSubmit={submitHandler}
          className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 border border-gray-200 rounded-md p-6 my-10 shadow-xl"
        >
          <h1 className="font-bold text-xl mb-5 text-center">Login</h1>

          <div className="my-3">
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={input.email}
              onChange={eventHandler}
              placeholder="email"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="my-3">
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              value={input.password}
              onChange={eventHandler}
              placeholder="enter password"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex items-center justify-between my-5">
            <RadioGroup className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex items-center">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={eventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="option-one">Student</Label>
              </div>
              <div className="flex items-center">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={eventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="option-two">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>

          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="mr-2 h-4 animate-spin" />
              Please Wait
            </Button>
          ) : (
            <Button type="Submit" className="w-full my-4">
              Login
            </Button>
          )}

          <span className="text-sm block text-center mt-3">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500">
              Sign Up
            </Link>
          </span>
        </form>
      </div>

      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
};

export default Login;
