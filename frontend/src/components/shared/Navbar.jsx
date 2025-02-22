import React, { useState } from "react";
import "./Navbar.css";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, Menu, User2, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const logOutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API}/logout`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div >
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
        <h1 className="job text-2xl font-bold">
          Job<span className="text-[#3886c2]">Loom</span>
        </h1>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-12">
          <ul className="flex items-center font-medium gap-5">
            {user && user.role === "recruiter" ? (
              <>
                <Link to="/admin/companies"><li>Companies</li></Link>
                <Link to="/admin/jobs"><li>Jobs</li></Link>
              </>
            ) : (
              <>
                <Link to="/"><li>Home</li></Link>
                <Link to="/jobs"><li>Jobs</li></Link>
                <Link to="/browse"><li>Browse</li></Link>
              </>
            )}
          </ul>

          {/* Authentication/Profile Section */}
          {!user ? (
            <div className="flex items-center gap-5">
              <Link to="/login"><Button variant="outline">Login</Button></Link>
              <Link to="/signup"><Button className="bg-[#3886c2] hover:bg-[#2e648e]">Signup</Button></Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.profile?.profilePhoto} />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 mx-2">
                <div className="flex gap-4 space-y-2">
                  <Avatar className="cursor-pointer">
                    <AvatarImage src={user?.profile?.profilePhoto} />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user?.fullname}</h4>
                    <p className="text-sm text-muted-foreground">{user?.profile?.bio}</p>
                  </div>
                </div>
                <div className="flex flex-col my-2 text-gray-600">
                  {user.role === "student" && (
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <User2 />
                      <Button variant="link"><Link to="/profile">View Profile</Link></Button>
                    </div>
                  )}
                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <LogOut />
                    <Button onClick={logOutHandler} variant="link">Logout</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center gap-4 py-4 border-t bg-white">
          <ul className="flex flex-col items-center font-medium gap-4">
            {user && user.role === "recruiter" ? (
              <>
                <Link to="/admin/companies"><li>Companies</li></Link>
                <Link to="/admin/jobs"><li>Jobs</li></Link>
              </>
            ) : (
              <>
                <Link to="/"><li>Home</li></Link>
                <Link to="/jobs"><li>Jobs</li></Link>
                <Link to="/browse"><li>Browse</li></Link>
              </>
            )}
          </ul>

          {/* Authentication/Profile Section in Mobile */}
          {!user ? (
            <div className="flex flex-col items-center gap-4">
              <Link to="/login"><Button variant="outline">Login</Button></Link>
              <Link to="/signup"><Button className="bg-[#3886c2] hover:bg-[#2e648e]">Signup</Button></Link>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <Avatar className="cursor-pointer">
                <AvatarImage src={user?.profile?.profilePhoto} />
              </Avatar>
              <h4 className="font-medium">{user?.fullname}</h4>
              <p className="text-sm text-muted-foreground text-center px-4">{user?.profile?.bio}</p>
              <div className="flex flex-col items-center gap-2">
                {user.role === "student" && <Button variant="link"><Link to="/profile">View Profile</Link></Button>}
                <Button onClick={logOutHandler} variant="link">Logout</Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
