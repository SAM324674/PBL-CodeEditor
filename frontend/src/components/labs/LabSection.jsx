import React from 'react'
import { LabCards } from './LabCards'
import { Outlet } from 'react-router-dom'
import { GridBackgroundDemo } from '../ui/GridBackground'

export const LabSection = () => {
  return (
    <>
         <GridBackgroundDemo >
        <div className='w-[100%] flex p-5 justify-start gap-6 flex-wrap '>
            <LabCards labQuestion="LAB 1: Introduction To Python"/>
            <LabCards labQuestion="LAB 2: Data Structure and Algorithm"/>
         
        </div>
        </GridBackgroundDemo>
        {/* <Outlet/> */}
    </>
  )
}
