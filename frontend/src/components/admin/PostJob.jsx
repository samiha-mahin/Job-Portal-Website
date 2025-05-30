import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import axios from 'axios'
import { JOB_API } from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

const PostJob = () => {
    const [input, setInput] = useState({
        tittle: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { companies } = useSelector(store => store.company);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
        setInput({ ...input, companyId: selectedCompany._id });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API}/post`, input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Error posting job");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen">
            <Navbar />
            <div className='flex justify-center w-full my-5 px-4'>
                <form onSubmit={submitHandler} className='w-full max-w-4xl border border-gray-200 shadow-lg rounded-md p-6 md:p-8'>
                    <h1 className='text-xl font-semibold mb-6 text-center'>Post a New Job</h1>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4'>
                        <div>
                            <Label>Title</Label>
                            <Input
                                type="text"
                                name="tittle"
                                value={input.tittle}
                                onChange={changeEventHandler}
                                className="my-1"
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                className="my-1"
                            />
                        </div>
                        <div>
                            <Label>Requirements</Label>
                            <Input
                                type="text"
                                name="requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                                className="my-1"
                            />
                        </div>
                        <div>
                            <Label>Salary</Label>
                            <Input
                                type="text"
                                name="salary"
                                value={input.salary}
                                onChange={changeEventHandler}
                                className="my-1"
                            />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                className="my-1"
                            />
                        </div>
                        <div>
                            <Label>Job Type</Label>
                            <Input
                                type="text"
                                name="jobType"
                                value={input.jobType}
                                onChange={changeEventHandler}
                                className="my-1"
                            />
                        </div>
                        <div>
                            <Label>Experience Level</Label>
                            <Input
                                type="text"
                                name="experience"
                                value={input.experience}
                                onChange={changeEventHandler}
                                className="my-1"
                            />
                        </div>
                        <div>
                            <Label>No of Positions</Label>
                            <Input
                                type="number"
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                                className="my-1"
                            />
                        </div>
                        {
                            companies.length > 0 && (
                                <div className="sm:col-span-2">
                                    <Label>Select Company</Label>
                                    <Select onValueChange={selectChangeHandler}>
                                        <SelectTrigger className="w-full mt-1">
                                            <SelectValue placeholder="Select a Company" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {companies.map((company) => (
                                                    <SelectItem key={company._id} value={company.name.toLowerCase()}>
                                                        {company.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            )
                        }
                    </div>
                    {
                        loading ? (
                            <Button className="w-full my-4" disabled>
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full my-4">Post New Job</Button>
                        )
                    }
                    {
                        companies.length === 0 &&
                        <p className='text-xs text-red-600 font-bold text-center my-3'>
                            *Please register a company first, before posting jobs
                        </p>
                    }
                </form>
            </div>
        </div>
    );
};

export default PostJob;
