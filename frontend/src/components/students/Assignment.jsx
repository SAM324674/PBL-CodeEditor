import React, { useEffect } from 'react'
import { GridBackgroundDemo } from '../ui/GridBackground'
import { useState } from 'react'
import axios from 'axios';
import { IoIosArrowForward } from "react-icons/io";

const Assignment = () => {
    const [upcoming,setUpComing]=useState(true);
    const [completed,setCompleted]=useState(false);
    const [missed,setMissed]=useState(false);
    const [assignments,setAssignments]=useState([]);
    const activeAssignments=assignments.filter(a=>!a.expired)
    const pastAssignments=assignments.filter(a=>a.expired);
    const handleUpcoming=()=>{
       
            setUpComing(true);
            setMissed(false);
            setCompleted(false);
     
        console.log("upcoming",upcoming);
        console.log("missed",missed);
        console.log("completed",completed);
    }
    const handleCompleted=()=>{
        
            setCompleted(true);
            setUpComing(false);
            setMissed(false);
      
        console.log("completed",completed);
        console.log("missed",missed);
        console.log("upcoming",upcoming);
    }
    const handleMissed=()=>{
      
            setMissed(true);
            setCompleted(false);
            setUpComing(false);
        
        console.log("missed",missed);
        console.log("completed",completed);
        console.log("upcoming",upcoming);
    }

    const getNewAssignment=async()=>{
        const token=localStorage.getItem('token');
        try {
            const response=await axios.get("http://localhost:8000/students/assignments",{
                headers:{
                    authorisation:`Bearer ${token}`
                }
            })

            console.log("response for student:",response.data.assignments);
            if (response.data && response.data.assignments) {
                setAssignments(response.data.assignments); // Store the assignments in the state
            } else {
                setAssignments([]); // Fallback to an empty array if no assignments are found
            }
           return response.data.assignments
      
        } catch (error) {
            console.error("Error fetching assignments:", error.response ? error.response.data : error.message);
        }
    }

    useEffect(()=>{
        const response=getNewAssignment();

       
    },[]);
    useEffect(()=>{
        console.log("assignments:",assignments);
    },[assignments])
    console.log("assignments outside useEffect:",assignments)
  return (
    <GridBackgroundDemo>
        <div className='h-[100vh]'>

            <div className='border border-[#7289DA] bg-[#2B2D3C] m-5 text-white rounded-lg p-4 flex flex-col gap-4'>
               <h1 className="text-xl">Assignments</h1> 
                <div className='flex bg-[#3c4161] lg:w-[30%] md:w-[45%] justify-between h-10 px-2 py-1 rounded-[0.25rem]'>
                    <button className={`${upcoming?'rounded-sm bg-[#2B2D3C] shadow-md':'bg-inherit shadow-none'} p-3 flex justify-center items-center`} onClick={handleUpcoming}>Upcoming</button>
                    <button className={`${completed?'rounded-sm bg-[#2B2D3C] shadow-md':''} p-3 flex justify-center items-center`} onClick={handleCompleted} >Completed</button>
                    <button className={`${missed?'rounded-sm bg-[#2B2D3C] shadow-md':''} p-3 flex justify-center items-center`} onClick={handleMissed}>Missed</button>
                </div>
                <div className='text-white w-full'>
                    {upcoming&&
                       <>
                           <div className='flex justify-around w-full text-md font-bold'>
                               <div className='flex justify-center w-full'>SL NO</div>
                               <div className='flex justify-center w-full'>Subject</div>
                               <div className='flex justify-center w-full'>Due Date</div>
                           </div>
                            {activeAssignments.map((assignment,index)=>(
                                <div className='flex w-full justify-around text-md text-white' key={index}>
                                <p className='flex justify-center w-full'>{index+1}</p>
                                <p className='flex justify-center w-full'>{assignments[index].question}</p>
                                <p className='flex justify-center w-full'>{assignments[index].deadline}</p>
                                <button className='flex justify-center items-center'><IoIosArrowForward /></button>
                                </div>)
                            )}  
                            
                       </>
                    }
                    {completed&&
                       <></>
                    }
                    {missed&&
                       <>
                       <div className='flex justify-around w-full text-md font-bold'>
                           <div className='flex justify-center w-full'>SL NO</div>
                           <div className='flex justify-center w-full'>Subject</div>
                           <div className='flex justify-center w-full'>Due Date</div>
                       </div>
                        {pastAssignments.map((assignment,index)=>(
                            <div className='flex w-full justify-around text-md text-white' key={index}>
                            <p className='flex justify-center w-full'>{index+1}</p>
                            <p className='flex justify-center w-full'>{assignments[index].question}</p>
                            <p className='flex justify-center w-full'>{assignments[index].deadline}</p>
                            
                            </div>)
                        )}  
                        
                   </>
                    }
                    
                </div>
            </div>
        </div>
    </GridBackgroundDemo>
  )
}

export default Assignment