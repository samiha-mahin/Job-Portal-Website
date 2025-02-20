import { setAllAppliedJobs } from '@/redux/jobSlice';
import { APPLICATION_API } from '@/utils/constant';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAppliedJob = () => {
    const dispatch = useDispatch();

    useEffect(()=>{
        const fetchAppliedJob = async() =>{
            try {
                const res = await axios.get(`${APPLICATION_API}/get`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setAllAppliedJobs(res.data.application))
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAppliedJob();
    },[])
}

export default useGetAppliedJob