import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LuGraduationCap } from "react-icons/lu";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { FaCode } from "react-icons/fa6";
import { LuUsers } from "react-icons/lu";
import { GridBackgroundDemo } from '../components/ui/GridBackground';
import { IoIosRocket } from "react-icons/io";
const Home = () => {
  useEffect(()=>{
    console.log(localStorage.getItem('token'));
    console.log(localStorage.getItem('role'));
  },[]);
  return (
    <>
     <GridBackgroundDemo >
    <div className='z-50 flex flex-col items-center mt-[9rem] gap-16'>
     
        <div className='flex flex-col items-center justify-center gap-2 '>
            <h1 className='font-bold text-[4rem] text-[#D1D5DB]'>Welcome to Codemy</h1>
            <p className='w-[70%] text-xl text-gray-500'>An interactive platform for learning and teaching programming. Choose your role to get started.</p>
        </div>
        <div className='flex items-center gap-5'>
            <Link to='/students/signin' className='text-white'>
                <div className='bg-[#263652] shadow-lg shadow-slate-800 hover:shadow-slate-400 text-[#FFFFFF] px-4 py-1 rounded-md flex items-center gap-2 text-md'>
                  <LuGraduationCap />
                  Student Signin
                </div>
            </Link>
            <Link to='/teachers/signin' className=''>
            <div className='bg-[#4A90E2] text-white border border-gray-400 px-4 py-1 rounded-md flex items-center gap-2 text-md'>
                <LiaChalkboardTeacherSolid />
                  Teacher Signin
            </div>
            </Link>
        </div>
     
        <div className='w-[100%] h-[20rem] mb-16 text-white  flex justify-evenly mt-10'>
            <div className='flex flex-col w-[30%] px-5 items-center gap-3 bg-[#2b2d3c] bg-opacity-70 rounded-lg justify-center text-center'>
              <FaCode className='text-[4rem] text-[#4A90E2] font-[200]'/>
              <h1 className='text-3xl font-[700]'>Immersive Coding Experience</h1>
              <p className="text-gray-500">
              Explore, debug, and build solutions in an intuitive coding environment.
              </p>
            </div>
            <div className='flex flex-col w-[30%] px-5 items-center gap-3  bg-[#2b2d3c] bg-opacity-70 rounded-lg justify-center text-center'>
              <LuGraduationCap className='text-[4rem] text-[#4A90E2]' />
              <h1 className='text-3xl font-[700]'>Learn at Your Pace</h1>
              <p className="text-gray-500">
              Access a variety of courses and progress at your own speed.
              </p>
            </div>
            <div className='flex flex-col w-[30%] px-5 items-center gap-3 bg-[#2b2d3c] bg-opacity-70 rounded-lg justify-center text-center'>
              <IoIosRocket className='text-[4rem] text-[#4A90E2]' />
              <h1 className='text-3xl font-[700]'>Skill-Building Platform</h1>
              <p className="text-gray-500">
              Enhance your coding expertise through structured challenges and real-time execution.
              </p>
            </div>
        </div>
        
      </div>
     
      <footer className='p-3 flex items-center  bg-[#2b2d3c] bg-opacity-70  justify-between'>
          <div className='flex justify-start  text-gray-600 text-sm'>
            © 2024 CodeEditor Lab. All rights reserved.
          </div>
          <div className='flex justify-end items-center  text-gray-600 text-sm gap-10'>
          <a href="#"><span>Terms of Service</span></a>
          <a href="#"><span>Privacy</span></a>
          </div>
      </footer>
      </GridBackgroundDemo>
  
    </>
  )
}

export default Home