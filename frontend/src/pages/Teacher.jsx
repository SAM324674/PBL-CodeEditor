import React from 'react'
import SideSection from '../components/sideSection'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
// import TeacherDashboard from './TeacherDashboard'

const TeacherDashboard = () => {
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

export default TeacherDashboard