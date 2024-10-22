import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LuGraduationCap } from "react-icons/lu";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { FaCode } from "react-icons/fa6";
import { LuUsers } from "react-icons/lu";
const Home = () => {
  useEffect(()=>{
    console.log(localStorage.getItem('token'));
    console.log(localStorage.getItem('role'));
  },[]);
  return (
    <>
      <div className='flex flex-col items-center mt-[10rem] gap-10'>
        <div className='flex flex-col items-center justify-center gap-2'>
            <h1 className='font-bold text-[3.4rem]'>Welcome to CodeEditor Lab</h1>
            <p className='w-[70%] text-lg text-gray-500'>An interactive platform for learning and teaching programming. Choose your role to get started.</p>
        </div>
        <div className='flex gap-5'>
            <Link to='/students/signin' className='text-white'>
                <div className='bg-black px-3 py-1 rounded-md flex items-center gap-2 text-md'>
                  <LuGraduationCap />
                  Student Signin
                </div>
            </Link>
            <Link to='/teachers/signin' className='text-black'>
            <div className='bg-slate-200 border border-gray-400 px-3 py-1 rounded-md flex items-center gap-2 text-md'>
                <LiaChalkboardTeacherSolid />
                  Teacher Signin
            </div>
            </Link>
        </div>
        <div className='w-[100%] h-[20rem] bg-slate-200 mt-[5rem] flex justify-evenly'>
            <div className='flex flex-col w-[30%] p-8 items-center gap-3 justify-center text-center'>
              <FaCode className='text-3xl font-[200]'/>
              <h1 className='text-xl font-[700]'>Interactive Coding</h1>
              <p className="text-gray-500">
                    Write, compile, and run code directly in your browser.
                    Learn at Your Pace
              </p>
            </div>
            <div className='flex flex-col w-[30%] p-8 items-center gap-3 justify-center text-center'>
              <LuGraduationCap className='text-3xl' />
              <h1 className='text-xl font-[700]'>Learn at Your Pace</h1>
              <p className="text-gray-500">
              Access a variety of courses and progress at your own speed.
              </p>
            </div>
            <div className='flex flex-col w-[30%] p-8 items-center gap-3 justify-center text-center'>
              <LuUsers className='text-2xl' />
              <h1 className='text-xl font-[700]'>Collaborative Environment</h1>
              <p className="text-gray-500">
              Interact with peers and receive guidance from experienced instructors.
              </p>
            </div>
        </div>
      
      </div>
      <footer className='p-3 flex items-center justify-between'>
          <div className='flex justify-start  text-gray-600 text-sm'>
            © 2024 CodeEditor Lab. All rights reserved.
          </div>
          <div className='flex justify-end items-center  text-gray-600 text-sm gap-10'>
          <a href="#"><span>Terms of Service</span></a>
          <a href="#"><span>Privacy</span></a>
          </div>
      </footer>
    </>
  )
}

export default Home