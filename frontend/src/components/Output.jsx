import React, { useState } from 'react'
import axios from 'axios'
const Output = (props) => {
    const [Output, setOutput] = useState();
    const { value } = props
    const onSubmit = async () => {
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
            // const responseString=JSON.stringify(response.data);
            // let data = response.data
            // console.log('[' + data.fill('Object').toString() + ']')

            // let responseString = response.data.output.replace(/\r\n/g, '');  // Removes \r\n
            // console.log(`DATA : ${JSON.stringify(responseString)}`);
            const formattedOutput=response.data.output.replace(/\n/g,'<br>')
            console.log(`DATA : ${(response.data.output)}`);
            setOutput(formattedOutput);
            return response.data;

        } catch (error) {
            console.error(`error:${error}`)
        }
    }



    return (
        <>
            <div className='h-[20vh]   '>
                <div className='flex items-center justify-end bg-white px-3'>
                    <button className='bg-black border border-white text-white p-3 rounded-md w-[20%]' onClick={onSubmit}>Run Code</button>
                </div>
                <div className='bg-black h-[20vh] rounded-md '>
                    <h1 className='text-white font-bold text-xl w-full  '>Output</h1>
                    <div className='text-white w-full h-full p-3 border border-red-500' dangerouslySetInnerHTML={{ __html: Output }}></div>
                </div>

            </div>
        </>
    )
}

export default Output