import React from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'

const filterData = [
    {
        filterType : "Location",
        array:["Dhaka","Chattagram","Khulna","Rajshahi","Sylhet"]
    },
    {
        filterType : "Industry",
        array:["Frontend Developer","Backend Developer","Fullstack Developer","Ui/Ux Designer"]
    },
    {
        filterType : "Salary",
        array:["0-20K","25-30K","35-40K","45k-1lakh","1-5lakh"]
    },
]

const FilterCard = () => {
  return (
    <div className='w-full bg-white p-3 rounded-md'>
        <h1 className='font-bold text-lg'>Filter Jobs</h1>
        <hr className='mt-3'/>
        <RadioGroup>
            {
                filterData.map((data,index)=>(
                    <div>
                        <h1 className='font-bold text-lg'>{data.filterType}</h1>
                        {
                            data.array.map((item,index)=>{
                                return (
                                    <div className='flex items-center space-x-2 my-2 text-gray-700'>
                                        <RadioGroupItem value={item}/>
                                        <Label>{item}</Label>
                                    </div>
                                )
                            })
                        }
                    </div>
                ))
            }
        </RadioGroup>
    </div>
  )
}

export default FilterCard