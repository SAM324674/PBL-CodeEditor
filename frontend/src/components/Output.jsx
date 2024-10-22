import React, { useState } from 'react';
import axios from 'axios';
import { questions } from './questions.jsx';
import { useParams } from 'react-router-dom';
import { FaPlay } from "react-icons/fa";
import { IoPaperPlaneOutline } from "react-icons/io5";
import dotenv from 'dotenv'
const Output = (props) => {
    // console.log('Judge0 API Key:', import.meta.env.VITE_Judge0_API_key);
    // console.log(questions)
   
    const [output, setOutput] = useState(); // Changed to lowercase
    const { questionId } = useParams(); 
    const [evaluation,setEvaluation]=useState('');
    // console.log("questionId:",questionId);
    const { value } = props;
    
    const question = questions.find(question => question.id === parseInt(questionId));
    const testCases = question.testCases;
    if (!question) {
        return <div>Question not found</div>; // Handle case where question doesn't exist
    }
   // function for checking the status of the submission token with retries
const checkStatus = async (token, retryCount = 5, delay = 2000) => {
    try {
        for (let i = 0; i < retryCount; i++) {
            const response = await axios.get(`https://judge0-extra-ce.p.rapidapi.com/submissions/${token}`, {
                headers: {
                    "x-rapidapi-key": import.meta.env.VITE_Judge0_API_key,
                    "x-rapidapi-host": "judge0-extra-ce.p.rapidapi.com"
                }
            });

            if (response.data.status.id === 1 || response.data.status.id === 2) {
                // If status is "in queue" (1) or "processing" (2), wait before checking again
                console.log("Submission still processing, retrying...");
                await new Promise(resolve => setTimeout(resolve, delay)); // Wait for the given delay
            } else {
                return response.data; // Return the submission result when it's ready
            }
        }
        console.error('Submission took too long to process.');
        return null;
    } catch (error) {
        console.error('Error fetching status:', error);
        return null;
    }
};

// const getLanguages = async () => {
//     try {
//         const response = await axios.get("https://judge0-extra-ce.p.rapidapi.com/languages", {
//             headers: {
//                 "x-rapidapi-key": import.meta.env.VITE_Judge0_API_key,
//                 "x-rapidapi-host": "judge0-extra-ce.p.rapidapi.com"
//             }
//         });
//         console.log(response.data); // Check the available languages and their IDs
//     } catch (error) {
//         console.error('Error fetching languages:', error);
//     }
// };

// getLanguages(); // Call this function to check available languages
    //For Running code
    const RunCode = async (sourceCode,input) => {
        const normalizedInput = Array.isArray(input) ? input.join(' ') : input; 
        console.log(`Sending input: ${normalizedInput}`); // Debugging line
        console.log(`sourceCode: ${sourceCode}`);
        try {
            const Submissionresponse=await axios.post("https://judge0-extra-ce.p.rapidapi.com/submissions",
                {
                    source_code:sourceCode,
                    language_id:28,
                    stdin:normalizedInput,
                    // expected_output:'odd'
                },
                 { 
                    headers:{
                        "x-rapidapi-key": import.meta.env.VITE_Judge0_API_key,
	                    "x-rapidapi-host": "judge0-extra-ce.p.rapidapi.com"
                    }
                }
            )
            
            console.log("judge0 response:",Submissionresponse.data);//this returns a token in the data

            const submitToken=Submissionresponse.data.token;
            return submitToken;          
        } catch (error) {
            console.error(`error:`,error.response ? error.response.data : error.message);
            setOutput('Error: Unable to execute the code.');
        }
    };

//to convert the stdout output to number when needed
    const normaliseType=(output,expected)=>{
        if (Array.isArray(expected)) {
            return output
                .trim()                    
                .replace(/\[|\]/g, '')      
                .split(',')                 
                .map(item => item.trim())   // Trim individual items
                .filter(item => item);      // Filter out empty strings
        }
        if (typeof expected === 'number' && expected % 1 !== 0) {
            let floatNum = parseFloat(output); 
            return isNaN(floatNum) ? 0 : floatNum; 
        }
    
        // Handle if the expected type is an Integer
        if (typeof expected === 'number' && expected % 1 === 0) {
            let intNum = parseInt(output, 10);   
            return isNaN(intNum) ? 0 : intNum;  
        }
       
        if(typeof expected==='string'){
            return output.trim().replace(/\n/g, '');
        }

        if (typeof expected === 'boolean') {
            return output === 'true' || output === true; // Normalize output to boolean
        }
    //  !Array.isArray(expected) &&
        // For objects, attempt to parse JSON strings
        if (typeof expected === 'object' && expected !== null) {
            try {
                return JSON.parse(output); // Attempt to parse output as JSON
            } catch (e) {
                return output; // If parsing fails, return the original output
            }
        }
        return output;
    }
    //for running testcases
    const runTestCase=async(sourceCode)=>{

        let evaluation=2
        for(const testCase of testCases){
            const {input,expected}=testCase;

            const token=await RunCode(sourceCode,input);

            const result=await checkStatus(token);
            
            if (!result) {
                console.error("Failed to get the execution result for test case:", testCase);
                evaluation = Math.min(evaluation, 0); 
                continue; 
            }
            console.log("result is run test case function:",result);
            // const output=JSON.stringify(result.stdout);
            const actualOutput = result?.stdout ? normaliseType(result.stdout, expected) : '';
            console.log(' String Actual Output:', JSON.stringify(actualOutput).trim().replace(/\n/g, ''));
            console.log(' String Expected Output:', JSON.stringify(expected));
            console.log("actualOutput:",actualOutput,"expected output:",expected);
            const hasPassed=actualOutput==expected||JSON.stringify(actualOutput).trim().replace(/\n/g, '') === JSON.stringify(expected);
            console.log('stderr',result.stderr);
            if(!hasPassed){
                console.log("the testcase it failed:",testCase)
                evaluation=Math.min(evaluation,0);
                break;
                
            }
        }

       return evaluation;
    }

    //for final execution or main execute function
    const onExecute=async()=>{
        const sourceCode = value.current.getValue();
        if (!sourceCode) {
            return;
        }
       try{
        const evaluation=await runTestCase(sourceCode);
        console.log("evaluation:",evaluation);
        return evaluation;
       }catch(error){
            console.error(`error:`, error.response ? error.response.data : error.message);

       }

    }
    const onSubmit = async () => {
        const token = localStorage.getItem('token');  
        console.log("Retrieved token:", token);
        
        if (!token) {
            console.error('No token in local storage');
            return;
        }
        try {
                const evaluation=await onExecute();
                console.log("evaluation sent:",JSON.stringify(evaluation));
                const response = await axios.post('http://localhost:8000/codeEditor/submit', {
                    evaluation: evaluation,
                    questionId: questionId
                }, {
                    headers: {
                        authorization: 'Bearer ' + token
                    }
                });
                console.log(response.data);
    
        } catch (err) {
            console.log("error", err);
        }
    };

    return (
        <>
            <div className='h-[20vh]'>
                <div className='flex items-center justify-end bg-white p-3 gap-5'>
                    <button className='bg-blue-400 border text-indigo-950 border-y-green-950 rounded-md p-3 w-[20%] flex items-center justify-evenly' onClick={onExecute}>
                        <FaPlay/>
                        Run Code
                        </button>
                    <button className='bg-green-200 border text-green-950 border-y-green-950 p-3 rounded-md w-[20%] flex items-center justify-evenly' onClick={onSubmit}>
                        <IoPaperPlaneOutline />
                        Submit Code
                    </button>
                </div>
                {/* <div className='bg-black h-[20vh] rounded-md'>
                    <h1 className='text-white font-bold text-xl w-full'>Output</h1>
                    <div className='text-white w-full h-full p-3 border border-red-500' dangerouslySetInnerHTML={{ __html: output }}></div>
                </div> */}
            </div>
        </>
    );
};

export default Output;
