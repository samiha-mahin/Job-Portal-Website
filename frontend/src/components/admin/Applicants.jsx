import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios'
import { APPLICATION_API } from '@/utils/constant'
import { useParams } from 'react-router-dom'

const Applicants = () => {
  const params = useParams();
  useEffect(()=>{
    const fetchAllApplication = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API}/${params.id}/applicants`,{withCredentials:true});
        if(res.data.success){
          
        }
      } catch (error) {
        console.log(error)
      }
    }
  },[])
  return (
    <div>
      <Navbar/>
      <div className='max-w-7xl mx-auto'>
        <h1 className='font-bold text-xl my-5'>Applicants (3)</h1>
        <ApplicantsTable/>
      </div>
    </div>
  )
}

export default Applicants