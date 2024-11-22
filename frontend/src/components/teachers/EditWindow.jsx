import React, { useEffect, useState } from 'react';
import axios from 'axios'
import {format} from 'date-fns'
// import { questions } from '../questions';
const EditWindow = (props) => {
  const {updatedAssignments,index,setUpdatedAssignments,setEditToggle}=props;
  const [question,setQuestion]=useState(updatedAssignments[index].question);
  const [deadline,setDeadline]=useState();
  const [testCaseCount,setTestCaseCount]=useState(updatedAssignments[index].testcasecount);
  const [testCases,setTestCases]=useState([...updatedAssignments[index].testcases]);

  useEffect(()=>{
      if(testCaseCount>testCases.length){
          setTestCases((prev)=>[...prev,...Array(testCaseCount-prev.length).fill('')]);

      }else if(testCaseCount<testCases.length){
          setTestCases((prev)=>prev.slice(0,testCaseCount));
      }
  },[testCaseCount]);

  const handleTestCaseChange = (id, key, value) => {
    const updatedTestCases = [...testCases];
    updatedTestCases[id][key] = value;
    setTestCases(updatedTestCases);
  };

  const handleSave = async () => {
    
    const updatedAssignment = {
      question,
      deadline,
      testcases: testCases,
    };

    try {
      const assignmentId=updatedAssignments[index].assignmentId;
      const response = await axios.put(
        `http://localhost:8000/teachers/newassignment/assignments/${assignmentId}`,
        updatedAssignment
      );

      // Update state with the new data
      const newAssignments = [...updatedAssignments];
      newAssignments[index] = response.data; // Assume backend returns updated assignment
      setUpdatedAssignments(newAssignments);

      // Close the modal
      setEditToggle(false);
    } catch (error) {
      console.error("Error updating assignment:", error);
      alert("Failed to update the assignment. Please try again.");
    }
  };

  return (
    <div className="h-full p-5 w-[100%] flex justify-center items-center inset-0 absolute z-40 bg-black bg-opacity-55 backdrop-blur-sm">
      <div className="bg-[#2B2D3C] h-[20rem] w-[80%]">
        <div className="flex flex-col items-center h-full overflow-hidden p-5 justify-center border rounded-md border-[#7289DA] gap-5">
          <div className="w-full h-[80%] flex items-center flex-col gap-4">
                <form className='text-black flex flex-col '>
                    <label>
                        Change question
                        <input value={question} onChange={(e)=>setQuestion(e.target.value)}/>
                    </label>
                    <label>
                        Change deadline
                        <input type='date' value={deadline} defaultValue={updatedAssignments[index].deadline} onChange={(e)=>setDeadline(e.target.value)}/>
                    </label>
                    <label>
                        testCases Count
                        <input type='number' value={testCaseCount} onChange={(e) => setTestCaseCount(Number(e.target.value))}/>
                    </label>

                    {testCases.map((testCase,id)=>(
                        <label key={id}>
                              testCases {id+1}:
                              <label>
                                  Input
                                  <input defaultValue={JSON.stringify(testCase.input)}
                                     type="text"
                                     value={testCase.input}
                                     onChange={(e) =>
                                       handleTestCaseChange(id, 'input', e.target.value)
                                     }
                                  />
                              </label>
                              
                              <label>
                                  Output
                                  <input defaultValue={JSON.stringify(testCase.output)}
                                     type="text"
                                     value={testCase.output}
                                     onChange={(e) =>
                                       handleTestCaseChange(id, 'output', e.target.value)
                                     }
                                  />
                              </label>
                        </label> 
                    ))}      
                </form>
          </div>
          <div className="flex w-[85%] justify-between">
            <button
              type="button"
              className="flex text-white gap-2 bg-[#3c4161] w-[20%] justify-center items-center h-10 p-3 rounded-[0.25rem]"
              onClick={() => setEditToggle(null)} // Example for handling close
            >
              Close
            </button>

            <button
              type="button"
              className="flex text-white gap-2 bg-[#3c4161] w-[20%] justify-center items-center h-10 p-3 rounded-[0.25rem]"
               onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditWindow;
