import React from 'react'
import { Link } from 'react-router-dom'
import { MdKeyboardArrowRight } from "react-icons/md";

export const LabCards = (props) => {
  const {labQuestion}=props;
  return(
    <>
       <div className='w-[30%] shadow-md border border-[#7289DA]  shadow-slate-900 p-4 h-[15rem] flex flex-col justify-between bg-[#2B2D3C] text-[#E5E5E5] rounded-md'>
            <div className=''>
              <h1 className='text-2xl font-bold'>{labQuestion}</h1>
              <p>12 questions</p>
            </div>
            <Link to='/students/labs/CodeEditor/question/1' className=' flex items-center justify-center'>
                <button className='bg-[#7289DA] flex items-center justify-center text-white w-[95%] p-3 rounded-lg '>Start Lab
                <MdKeyboardArrowRight />
                </button>
            </Link>
       </div>
    </>
  )
}
