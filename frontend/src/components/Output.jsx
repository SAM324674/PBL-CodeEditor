import React, { useState } from 'react'
import axios from 'axios'
const Output = (props) => {
    const [Output, setOutput] = useState();
    const { value } = props
    const onExecute = async () => {
        const sourceCode = value.current.getValue();
        if (!sourceCode) {
            return
        }
        console.log(`sourceCode:${sourceCode}`);
        try {
            const response = await axios.post('http://localhost:8000/codeEditor',
                {
                    sourceCode,
                }
            );
            
            const formattedOutput=response.data.output.replace(/\n/g,'<br>')
            console.log(`DATA : ${(response.data.output)}`);
            setOutput(formattedOutput);
            return response.data;

        } catch (error) {
            console.error(`error:${error}`)
        }
    }

    const onSubmit=async()=>{
        const token=localStorage.getItem('token');  
        console.log("Retrieved token:",token);
        if(!token){
            console.error('No token in local storage');
            return;
        }
        try{
            const response = await axios.post('http://localhost:8000/codeEditor/submit',{
                evaluation:'2',
                questionId:'1'
            },
            {
                headers:{
                    authorization:'Bearer '+token
                }
            })
            console.log(response.data);
        }
        catch(err){
            console.log("error",err);
        }
    }

    return (
        <>
            <div className='h-[20vh]   '>
                <div className='flex items-center justify-end bg-white px-3'>
                    <button className='bg-black border border-white text-white p-3 rounded-md w-[20%]' onClick={onExecute}>Run Code</button>
                    <button className='bg-black border border-white text-white p-3 rounded-md w-[20%]' onClick={onSubmit}>Submit Code</button>
                </div>
                <div className='bg-black h-[20vh] rounded-md '>
                    <h1 className='text-white font-bold text-xl w-full '>Output</h1>
                    <div className='text-white w-full h-full p-3 border border-red-500' dangerouslySetInnerHTML={{ __html: Output }}></div>
                </div>

            </div>
        </>
    )
}

export default Output