import React from 'react'
import SideSection from '../components/sideSection'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { GridBackgroundDemo } from '../components/ui/GridBackground'

const Layout = () => {
  return (
    <>
        <div className='h-[100vh] overflow-hidden'>
            <Navbar/>
            <div className='flex w-[100%]'>
                <SideSection/>
                {/* <GridBackgroundDemo> */}
                  <Outlet/>
                {/* </GridBackgroundDemo> */}
                
            </div>
        </div>
       
    </>
  )
}

export default Layout