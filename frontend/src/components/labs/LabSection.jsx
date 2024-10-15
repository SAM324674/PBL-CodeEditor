import React from 'react'
import { LabCards } from './LabCards'

export const LabSection = () => {
  return (
    <>
        <div className='w-[80%] border flex p-5 justify-evenly'>
            <LabCards/>
            <LabCards/>
            <LabCards/>
        </div>
    </>
  )
}
