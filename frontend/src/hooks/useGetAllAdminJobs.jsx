import { setAllAdminJobs } from '@/redux/jobSlice';
import { JOB_API } from '@/utils/constant';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllAdminJobs = () => {
 const dispatch = useDispatch();
 useEffect(()=>{
    const fecthAllAdminJobs = async()=>{
        try {
            const res = await axios.get(`${JOB_API}/getadminjobs`,{withCredentials:true});
            if(res.data.success){
                dispatch(setAllAdminJobs(res.data.jobs));
            }
        } catch (error) {
            console.log(error);
        }
    }
    fecthAllAdminJobs();
 },[])
}

export default useGetAllAdminJobs

