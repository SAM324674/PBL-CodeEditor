import React, { useEffect, useState } from 'react'
import { IoNotificationsOutline } from "react-icons/io5";
import {useLocation, useParams} from 'react-router-dom'
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMenu } from "react-icons/md";
const Navbar = (props) => {
  const {isToggleQuestion,handleToggleQuestion,setIsToggleQuestion}=props;
  const location=useLocation();
  const {id:questionId}=useParams();
  
  //state for conditional navbar rendering 
  const [isNormal,setIsNormal]=useState(true);
  useEffect(()=>{
    if(location.pathname.includes('/students/labs/CodeEditor')){
        setIsNormal(false);
    }
    else{
        setIsNormal(true);
    }
      
  },[location.pathname]);
  return (
    <>
        <div className='w-full flex gap-40 h-14 bg-[#2B2D3C] bg-opacity-5 backdrop-blur-lg items-center' >
            {/* <div className='w-[20%] border'/> */}
            {isNormal? <div></div>:
              <button className='text-white p-3 ml-2 font-semibold text-xl' onClick={handleToggleQuestion}>
                <MdOutlineMenu /> 
              </button>
            }
            {isNormal?<h1 className=' w-[13%] text-2xl text-white font-[900] -ml-20'>welcome</h1>:<h1></h1>}
            
            <div className='flex w-[8%] items-center text-white justify-evenly ml-[50rem]'>
                <div className='bg-[#7289DA] p-3 rounded-full'>
                    <IoNotificationsOutline />
                </div>
                <div className='bg-[#7289DA] p-3 rounded-full'>
                    <FaRegUser />
                </div>
            </div>
        </div>
    </>
  )
}

export default Navbar