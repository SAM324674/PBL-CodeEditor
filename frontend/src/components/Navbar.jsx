import React from 'react'
import { IoNotificationsOutline } from "react-icons/io5";

import { FaRegUser } from "react-icons/fa";


const Navbar = () => {
  return (
    <>
        <div className='w-full border flex gap-40 h-12 bg-white items-center' >
            <div className='w-[20%] border'/>
            <h1 className=' w-[13%] text-2xl font-[900] -ml-20'></h1>
            <div className='flex border w-[8%] items-center justify-evenly ml-[28rem]'><IoNotificationsOutline />
                <FaRegUser />
            </div>
        </div>
    </>
  )
}

export default Navbar