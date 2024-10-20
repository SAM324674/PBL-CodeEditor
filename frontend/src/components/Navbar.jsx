import React, { useEffect, useState } from 'react'
import { IoNotificationsOutline } from "react-icons/io5";
import {useLocation} from 'react-router-dom'
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMenu } from "react-icons/md";
const Navbar = (props) => {
  const {isToggleQuestion,handleToggleQuestion,setIsToggleQuestion}=props;
  const location=useLocation();
  
  
  //state for conditional navbar rendering 
  const [isNormal,setIsNormal]=useState(true);
  useEffect(()=>{
    if(location.pathname==='/students/labs/CodeEditor'){
        setIsNormal(false);
    }
    else{
        setIsNormal(true);
    }
      
  },[location.pathname]);
  return (
    <>
        <div className='w-full border flex gap-40 h-12 bg-white items-center' >
            {/* <div className='w-[20%] border'/> */}
            {isNormal? <div></div>:
              <button className='border p-3 ml-2 font-semibold text-xl' onClick={handleToggleQuestion}>
                <MdOutlineMenu/> 
              </button>
            }
            {isNormal?<h1 className=' w-[13%] text-2xl font-[900] -ml-20'>welcome</h1>:<h1></h1>}
            
            <div className='flex border w-[8%] items-center justify-evenly ml-[28rem]'><IoNotificationsOutline />
                <FaRegUser />
            </div>
        </div>
    </>
  )
}

export default Navbar