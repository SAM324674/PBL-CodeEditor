import axios from 'axios';
import React, { useState } from 'react'

const Login = () => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    //for submitting the login  
    const handleSubmit=async(e)=>{
        e.preventDefault()
        try{
            const response=await axios.post('http://localhost:8000/students/signin',{
                email,
                password
            });
            console.log(response.data);
        }catch(error){
            console.error(`Error submitting login details:${error}`);
        }
    };
  return (
    <>
        <div className='w-[100%] flex justify-center items-center h-[100vh]'>
            <div className='w-[60%] border rounded-md flex flex-col '>
                <div>
                    <h1 className='text-2xl font-bold'>Log in</h1>
                    <p className='text-gray-500'>Enter your email and password to access your account</p>
                </div>
                <form>
                    <label htmlFor='email'>
                        <input type='email' id='email' value={email} onChange={(e)=>setEmail(e.target.value)} name='email' className='border rounded-md p-3' placeholder='ex:John@gmail.com'/>
                    </label>
                    <label>
                        <input type='password' id='password' value={password} onChange={(e)=>setPassword(e.target.value)} name='password' className='border rounded-md p-3' placeholder='password123'/>
                    </label>
                    <button type='submit' onClick={(e)=>handleSubmit(e)} className='bg-black text-white p-3 w-[80%]'>Login</button>
                </form>
            </div>
        </div>
    </>
  )
}

export default Login