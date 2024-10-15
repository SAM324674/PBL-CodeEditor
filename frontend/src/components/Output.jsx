import React from 'react'
import axios from 'axios'
const Output = (props) => {
    const {value}=props
     const onSubmit = async()=>{
        const sourceCode=value.current.getValue();
                if(!sourceCode){
                    return
                }
                console.log(sourceCode);
                try {
                    const response=await axios.post('http://localhost:8000/codeEditor',
                        {
                            sourceCode:{sourceCode},
                        }
                    );
                    console.log(response);
                    return response.data; 
                    
                } catch (error) {
                    
                }
    }
            
        
    
  return (
    <>
        <div className='h-[20vh]  '>
            <div className='flex items-center justify-end bg-white px-3'>
                <button className='bg-black border border-white text-white p-3 rounded-md w-[20%]' onClick={onSubmit}>Run Code</button>
            </div>
            <div className='bg-black h-[20vh] rounded-md'><p className='text-white p-3'>Output</p></div>
                
        </div>
    </>
  )
}

export default Output