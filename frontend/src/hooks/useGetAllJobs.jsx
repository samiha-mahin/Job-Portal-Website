import { setAllJobs } from '@/redux/jobSlice';
import { JOB_API } from '@/utils/constant';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllJobs = () => {
 const dispatch = useDispatch();
 const {searchedQuery} = useSelector(store=>store.job);
 useEffect(()=>{
    const fecthAllJobs = async()=>{
        try {
            const res = await axios.get(`${JOB_API}/get?keyword=${searchedQuery}`,{withCredentials:true});
            if(res.data.success){
                dispatch(setAllJobs(res.data.jobs));
            }
        } catch (error) {
            console.log(error);
        }
    }
    fecthAllJobs();
 },[])
}

export default useGetAllJobs