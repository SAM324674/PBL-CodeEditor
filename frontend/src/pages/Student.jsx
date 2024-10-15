import React from 'react'
import SideSection from '../components/sideSection'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

const StudentDashboard = () => {
  return (
    <>
        <div className='bg-slate-300'>
            <Navbar/>
            <div className='flex '>
                <SideSection/>
                <Outlet/>
            </div>
        </div>
       
    </>
  )
}

export default StudentDashboard