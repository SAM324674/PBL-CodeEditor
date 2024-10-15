import React from 'react'
import { Router,Link } from 'react-router-dom';
import { MdDashboard } from "react-icons/md";
import { CgNotes } from "react-icons/cg";
import { IoIosCode } from "react-icons/io";
const SideSection = () => {
    const navIcons={
        "Icons":[
            <MdDashboard />,
            <CgNotes />,
            <IoIosCode />,
        ],
            
        "Contents":["Dashboard","Assignments","Lab"],
        "Links":['','assignments','labs']
    }
  return (
    <>
        <div className='flex w-[20%] m-0'>
            <section className='w-full border flex flex-col items-start  bg-[#455073] text-white h-[92vh]'>
                
                {navIcons.Icons.map((items,index)=> 
                <Link to={navIcons.Links[index]} key={index} className='p-4 w-[100%]'>
                    <div className='flex items-center justify-around w-[100%]'>
                        <div className='w-[1%] '>{items}</div>
                        <p className='w-[70%] '>{navIcons.Contents[index]}</p>
                    </div> 
                </Link>)
                }
                
                
            </section>
        </div>
      
    </>
  )
}

export default SideSection