import React from 'react'
import { GridBackgroundDemo } from '../ui/GridBackground'
import { useState,useEffect } from 'react'
import { MdAdd } from "react-icons/md";
import NewAssignmentWindow from './NewAssignmentWindow';
import axios from 'axios';
import { format } from 'date-fns';
import { BsThreeDots } from "react-icons/bs";
import PopUpWindow from './ViewWindow';
import ViewWindow from './ViewWindow';
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { LuEye } from "react-icons/lu";
import EditWindow from './EditWindow';
const TAssignment = () => {
    const [active,setActive]=useState(true);
    const [notActive,setNotActive]=useState(false);
    const [newAssignment,setNewAssignment]=useState(false);
    const [question,setQuestion]=useState('');
    const [deadline,setDeadline]=useState('');
    const [testCases, setTestCases] = useState([]);
    const [updatedAssignments,setUpdatedAssignments]=useState([]);
    const [menu,setMenu]=useState();
    const [viewToggle,setViewToggle]=useState();
    const [viewDetails,setViewDetails]=useState({});
    const [editToggle,setEditToggle]=useState();

    const activeAssignments=updatedAssignments.filter(a=>!a.expired)
    const pastAssignments=updatedAssignments.filter(a=>a.expired);

    // useEffect(() => {
    //     console.log('testCases:', testCases);
    // }, [testCases]);

    const handleActiveAssignment=()=>{
            setActive(true);
            setNotActive(false);
    }
    const handleInActiveAssignments=()=>{
            setNotActive(true);
            setActive(false);
    }
 
    const handleNewAssignment=()=>{
        setNewAssignment(true);
    }

    const HandleTestCaseInput = (e, index, field) => {
        const updatedTestCase = [...testCases];
       
        // if (!updatedTestCase[index]) {
        //   updatedTestCase[index] = { input: '', output: '' };
        // }
        updatedTestCase[index] = {
          ...updatedTestCase[index],
          [field]: e.target.value,
        };
        // updatedTestCase[index][field] = e.target.value;
        setTestCases(updatedTestCase);
    };
    
    const addAssignment = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        console.log('Token:', token);
    
        if (!question?.trim()) return alert('Please enter a question.');
        if (!deadline?.trim()) return alert('Please set a deadline.');
        if (testCases.length === 0 || !testCases.every(tc => tc.input && tc.output)) {
            return alert('Please fill in all test case inputs and outputs.');
        }
    
        try {
            const response = await axios.post(
                'http://localhost:8000/teachers/newassignment',
                { question, testcases: testCases, deadline },
                { headers: { authorization: `Bearer ${token}` } }
            );
            setUpdatedAssignments(prevAssignments => [...prevAssignments,response.data.newAssignment]);
            console.log('API Response:', response);
            
            setNewAssignment(false);
        } catch (error) {
            console.error('Error response:', error.response.data || error);
            alert('Failed to add assignment. Please try again.');
        }
    };
    
    const getAssignment = async () => {
        const token = localStorage.getItem('token');
    
        try {
            const response = await axios.get('http://localhost:8000/teachers/newassignment', {
                headers: {
                    authorization: 'Bearer ' + token,
                },
            });
            console.log("API response:", response.data); // Log the entire response
    
            if (response.data && response.data.assignments) {
                return response.data.assignments; // Ensure it has the expected structure
            } else {
                console.error("Invalid response format:", response.data);
                return [];
            }
        } catch (error) {
            console.error("Error fetching assignments:", error);
            return [];
        }
    };
    
    useEffect(()=>{
        const fetchAssignments=async()=>{
            const assignments=await getAssignment() ;
            setUpdatedAssignments(assignments);
            
            console.log("assignments fetched from database: ",assignments);
        }
        fetchAssignments();
        // console.log("updated assignments:",updatedAssignments);
    },[]);

    // useEffect(() => {
    //     const addTestCaseNumbers = () => {
    //         setUpdatedAssignments(prevAssignments =>
    //             prevAssignments.map(assignment => {
    //                 const testCaseCount = assignment.testcases?.length || 0;
    //                 return { ...assignment, testCaseNo: testCaseCount };
    //             })
    //         );
    //     };
    //     addTestCaseNumbers();
    // }, []); // Trigger recalculation if `updatedAssignments` changes
    
    console.log("updated Assignments:",updatedAssignments);
    

    const handleMenuToggle = (index) => {
        setMenu(prev => prev === index ? null : index); // Toggle the menu for the clicked assignment
    };
     
    const handleViewDetails=(index)=>{
        setViewToggle(index);
        console.log("index",index);
        console.log("updated assignments array in the handleView:",updatedAssignments);
        setViewDetails({index:index,question:updatedAssignments[index].question,testcases:updatedAssignments[index].testcases,deadline:updatedAssignments[index].deadline});
    }
    // console.log("updated assignments:",updatedAssignments);
  return (
    <GridBackgroundDemo>
        <div className='h-[100vh] overflow-hidden'>
            {newAssignment&&
                <NewAssignmentWindow newAssignment={newAssignment} setNewAssignment={setNewAssignment} addAssignment={addAssignment} testCases={testCases} HandleTestCaseInput={HandleTestCaseInput} setTestCases={setTestCases} question={question} deadline={deadline} setQuestion={setQuestion} setDeadline={setDeadline}/>
            }
            <div className='border border-[#7289DA] bg-[#2B2D3C] m-5 text-white rounded-lg p-4 flex flex-col gap-4'>
               <h1 className="text-xl">Assignments</h1> 
                <div className='flex justify-between'>
                    <div className='flex bg-[#3c4161] lg:w-[35%] md:w-[50%] justify-around px-2 py-1 rounded-[0.25rem]'>
                        <button className={`${active?'rounded-sm bg-[#2B2D3C] shadow-md':'bg-inherit shadow-none'} p-3 flex justify-center items-center`} onClick={handleActiveAssignment}>Active Assignments</button>
                        <button className={`${notActive?'rounded-sm bg-[#2B2D3C] shadow-md':''} p-3 flex justify-center items-center`} onClick={handleInActiveAssignments} >Past Assignments</button>
                        
                    </div>
                    <button className='flex gap-2 bg-[#3c4161] lg:w-[15%] md:w-[15%] justify-center items-center h-10 px-2 py-1 rounded-[0.25rem]' onClick={handleNewAssignment}>
                        <MdAdd />
                        Add Assignment
                    </button>
                </div>
                <div className='text-white w-full'>
                    {active&&
                       <>
                           <div className='flex justify-around w-full text-md font-bold border-b-2 mb-3 border-[#3c4161]'>
                               <div className='flex justify-center w-full'>Question</div>
                               <div className='flex justify-center w-full'>Deadline</div>
                               <div className='flex justify-center w-full'>Submissions</div>
                               <div className='flex justify-center w-full'>Actions</div>
                           </div>
                            <div>
                                 {activeAssignments.map((assignment,index)=>(
                                    <div key={index} className='flex w-full text-white border-b-2 border-[#3c4161]' >
                                         <div className='w-full  flex justify-center'>{assignment.question}</div>
                                         <div className='w-full  flex justify-center'>{new Date(assignment.deadline).toLocaleDateString()} </div>
                                         <div className='w-full  flex justify-center'>0/10</div>
                                         <button className='w-full  flex justify-center  text-white' onClick={()=>{handleMenuToggle(index)}}>
                                            <BsThreeDots />
                                         {menu===index &&
                                                (<div className='flex flex-col absolute border p-2 rounded mt-3 text-sm gap-2 backdrop-blur-sm border-[#3c4161]'>
                                                    <a className='hover:bg-slate-500 p-1 flex items-center justify-start gap-2 rounded-sm px-2 backdrop-blur-sm bg-opacity-10' onClick={()=>handleViewDetails(index)}><LuEye size={20}/><span className="w-full flex justify-start">View Details</span></a>
                                                    <a className='hover:bg-slate-500 p-1 flex items-center justify-start gap-2 rounded-sm px-2 backdrop-blur-sm bg-opacity-10' onClick={()=>setEditToggle(index)}><FaRegEdit size={20}/><span className="w-full flex justify-start">Edit</span></a>
                                                    <a className='hover:bg-slate-500 p-1 flex items-center justify-start gap-2 rounded-sm px-2 backdrop-blur-sm bg-opacity-10'><MdDeleteOutline size={23}/><span className="w-full flex justify-start">Delete</span></a>
                                                </div>)
                                         }
                                         </button>
                                         {
                                            viewToggle===index &&
                                            (
                                                <ViewWindow viewDetails={viewDetails} setViewDetails={setViewDetails} viewToggle={viewToggle} setViewToggle={setViewToggle}/>
                                            )
                                        }
                                        {
                                            editToggle===index &&
                                            (
                                                <EditWindow updatedAssignments={updatedAssignments} index={index} setUpdatedAssignments={setUpdatedAssignments} setEditToggle={setEditToggle} />
                                            )
                                        }
                                    </div>
                                 ))}
                            </div>
                            {/* <div className='flex w-full justify-around text-md'>
                                <p className='flex justify-center w-full'>1.</p>
                                <p className='flex justify-center w-full'>Python Lab</p>
                                <p className='flex justify-center w-full'>31.11.24</p>
                                
                            </div> */}
                       </>
                    }
                    {notActive&&
                        (
                            <>
                                <div className='flex justify-around w-full text-md font-bold border-b-2 mb-3 border-[#3c4161]'>
                                <div className='flex justify-center w-full'>Question</div>
                                <div className='flex justify-center w-full'>Deadline</div>
                                <div className='flex justify-center w-full'>Submissions</div>
                                <div className='flex justify-center w-full'>Actions</div>
                                                        </div>
                                                         <div>
                                  {pastAssignments.map((assignment,index)=>(
                                     <div key={index} className='flex w-full text-white border-b-2 border-[#3c4161]' >
                                          <div className='w-full  flex justify-center'>{assignment.question}</div>
                                          <div className='w-full  flex justify-center'>{new Date(assignment.deadline).toLocaleDateString()} </div>
                                          <div className='w-full  flex justify-center'>0/10</div>
                                          <button className='w-full  flex justify-center  text-white' onClick={()=>{handleMenuToggle(index)}}>
                                             <BsThreeDots />
                                          {menu===index &&
                                                 (<div className='flex flex-col absolute border p-2 rounded mt-3 text-sm gap-2 backdrop-blur-sm border-[#3c4161]'>
                                                     <a className='hover:bg-slate-500 p-1 flex items-center justify-start gap-2 rounded-sm px-2 backdrop-blur-sm bg-opacity-10' onClick={()=>handleViewDetails(index)}><LuEye size={20}/><span className="w-full flex justify-start">View Details</span></a>
                                                     <a className='hover:bg-slate-500 p-1 flex items-center justify-start gap-2 rounded-sm px-2 backdrop-blur-sm bg-opacity-10' onClick={()=>setEditToggle(index)}><FaRegEdit size={20}/><span className="w-full flex justify-start">Edit</span></a>
                                                     <a className='hover:bg-slate-500 p-1 flex items-center justify-start gap-2 rounded-sm px-2 backdrop-blur-sm bg-opacity-10'><MdDeleteOutline size={23}/><span className="w-full flex justify-start">Delete</span></a>
                                                 </div>)
                                          }
                                          </button>
                                          {
                                             viewToggle===index &&
                                             (
                                                 <ViewWindow viewDetails={viewDetails} setViewDetails={setViewDetails} viewToggle={viewToggle} setViewToggle={setViewToggle}/>
                                             )
                                         }
                                         {
                                             editToggle===index &&
                                             (
                                                 <EditWindow updatedAssignments={updatedAssignments} index={index} setUpdatedAssignments={setUpdatedAssignments} setEditToggle={setEditToggle} />
                                             )
                                         }
                                     </div>
                                  ))}
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    </GridBackgroundDemo>
  )
}

export default TAssignment