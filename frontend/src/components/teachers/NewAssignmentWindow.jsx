import React, { useEffect, useState } from 'react';
import axios from 'axios'
// import { questions } from '../questions';
const NewAssignmentWindow = (props) => {
  const { newAssignment, setNewAssignment,addAssignment,testCases,HandleTestCaseInput,setTestCases,setDeadline,setQuestion,question,deadline } = props;
  const [testCasesNo, setTestCasesNo] = useState(0);
 
  

  useEffect(() => {
    console.log('testCases:', testCases);
  }, [testCases]);

  // console.log(testCases)


  return (
    <div className="h-full p-5 w-[100%] flex justify-center items-center inset-0 absolute z-40 bg-black bg-opacity-55 backdrop-blur-sm">
      <div className="bg-[#2B2D3C] h-[20rem] w-[80%]">
        <form className="flex flex-col items-center h-full overflow-hidden p-5 justify-center border rounded-md border-[#7289DA] gap-5">
          <div className="w-full h-[80%] overflow-y-scroll flex items-center flex-col gap-4">
            <label
              htmlFor="question"
              className="flex flex-col border-2 border-[#7289DA] p-2 text-white w-[90%] rounded-md font-semibold"
            >
              Enter Question
              <input
                id="question"
                placeholder="Eg: WAP to print sum of two numbers"
                type="text"
                className="bg-[#2B2D3C]"
                value={question}
                onChange={(e)=>setQuestion(e.target.value)}
              />
              
            </label>

            <label
              htmlFor="deadline"
              className="flex flex-col border-2 border-[#7289DA] p-2 text-white w-[90%] rounded-md font-semibold"
            >
              Enter Deadline
              <input
                id="deadline"
                placeholder="Eg: WAP to print sum of two numbers"
                type="date"
                className="bg-[#2B2D3C] text-white"
                value={deadline}
                onChange={(e)=>setDeadline(e.target.value)}
              />
            </label>

            <label
              htmlFor="testcasesNo"
              className="flex flex-col border-2 border-[#7289DA] p-2 text-white w-[90%] rounded-md font-semibold"
            >
              Enter the number of test cases
              <input
                id="testcasesNo"
                placeholder="3"
                type="number"
                value={testCasesNo}
                className="bg-[#2B2D3C]"
                onChange={(e) => {
                  const count = parseInt(e.target.value) || 0;
                  setTestCasesNo(count);
                  setTestCases(Array.from({ length: count }, () => ({ input: '', output: '' })));
                }}
              />
            </label>
            {Array.from({length:testCasesNo}).map((_, index) => (
              <div
                key={index}
                className="flex flex-col border-2 border-[#7289DA] p-2 text-white w-[90%] rounded-md font-semibold"
              >
                Test Case {index + 1}:
                <div className="flex justify-evenly">
                  <label htmlFor={`input-${index}`} className="flex flex-col">
                    Input:
                    <input
                      id={`input-${index}`}
                      placeholder="Input"
                      value={testCases[index]?.input || ''}
                      className="bg-[#2B2D3C]"
                      onChange={(e) => HandleTestCaseInput(e, index, 'input')}
                    />
                  </label>
                  <label htmlFor={`output-${index}`} className="flex flex-col">
                    Output:
                    <input
                      id={`output-${index}`}
                      placeholder="Output"
                      value={testCases[index]?.output || ''}
                      className="bg-[#2B2D3C]"
                      onChange={(e) => HandleTestCaseInput(e, index, 'output')}
                    />
                  </label>
                </div>
              </div>
            ))}
          </div>
          <div className="flex w-[85%] justify-between">
            <button
              type="button"
              className="flex text-white gap-2 bg-[#3c4161] w-[20%] justify-center items-center h-10 p-3 rounded-[0.25rem]"
              onClick={() => setNewAssignment(false)} // Example for handling close
            >
              Close
            </button>
            <button
              type="submit"
              className="flex text-white gap-2 bg-[#3c4161] w-[20%] justify-center items-center h-10 p-3 rounded-[0.25rem]"
            onClick={addAssignment}>
              Add Assignment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewAssignmentWindow;
