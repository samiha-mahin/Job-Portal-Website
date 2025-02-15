import React from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const PostJob = () => {
  return (
    <div>
        <Navbar/>
        <div className='felx items-center justify-center max-w-6xl mx-auto my-5'>
            <Label>Tittle</Label>
            <Input
            type = "text"
            name = "title"
            // value = {}
            // onChange = {}
            className = "focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
            />
        </div>
    </div>
  )
}

export default PostJob