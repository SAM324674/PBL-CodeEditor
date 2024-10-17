import React from 'react'
import { Link } from 'react-router-dom'
import { MdKeyboardArrowRight } from "react-icons/md";

export const LabCards = () => {
  return(
    <>
       <div className='w-[30%] border p-4 h-[15rem] flex flex-col justify-between bg-white rounded-lg'>
            <div className=''>
              <h1 className='text-2xl font-bold'>Lab1:Basics</h1>
              <p>12 questions</p>
            </div>
            <Link to='/CodeEditor' className='border flex items-center justify-center'>
                <button className='bg-black flex items-center justify-center text-white w-[95%] p-3 rounded-lg '>Start Lab
                <MdKeyboardArrowRight />
                </button>
            </Link>
       </div>
    </>
  )
}
