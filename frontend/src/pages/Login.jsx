import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { GridBackgroundDemo } from '../components/ui/GridBackground';
import cyberpunk from '../assets/images/Cyberpunk Aesthetic.gif'
import cyberpunk2 from '../assets/images/animation2.gif'
const Login = () => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    // const [isAuthenticate,setIsAuthenticate]=useState(false);
    // const [token,setToken]=useState();
    const navigate=useNavigate();
    const [role,setRole]=useState('');
    const [signup, setSignup] = useState(false);
    //for logout
    const location=useLocation();
    // console.log(location.pathname);
    
   useEffect(()=>{
        if(location.pathname==='/students/signin'){
            setRole('students');
        }
        else if(location.pathname==='/teachers/signin'){
            setRole('teachers');
        }
        else{
            setRole('admin');
        }
        
   },[location.pathname]);
    //for submitting the login  
    const handleSubmit=async(e)=>{
        e.preventDefault()
        try{
            const response=await axios.post(`http://localhost:8000/${role}/signin`,{
                email,
                password
            });
            console.log("token:",response.data.token);
            // setToken(response.data.token);
            //saving token in local storage
            localStorage.setItem('role',role);
            localStorage.setItem('token',response.data.token);
            navigate(`/${role}/dashboard`);
        }catch(error){
            console.error(`Error submitting login details:${error}`);
        }
    };

    return (
        <>
            
            <div className='flex'>
            <div className='w-[80%]'>
                <GridBackgroundDemo>
                    <section className=" w-[100%]">
                        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ">
                            <div className="w-full bg-[#2B2D3C] rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                    <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
                                        {signup ? <>Sign up in to you account</> : <>Sign in to your account</>}
                                    </h1>
                                    <form className="space-y-4 md:space-y-6">
                                        {signup && <div>
                                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                                            <input type="name" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John Doe" required="" />
                                        </div>}
                                        <div>
                                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-white dark:text-white">Your email</label>
                                            <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                                        </div>
                                        <div>
                                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-white dark:text-white">Password</label>
                                            <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                        </div>
                                        {!signup && <div className="flex items-center justify-between">
                                            <div className="flex items-start">
                                                <div className="flex items-center h-5">
                                                    <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                                </div>
                                                <div className="ml-3 text-sm">
                                                    <label htmlFor="remember" className="text-white dark:text-gray-300">Remember me</label>
                                                </div>
                                            </div>
                                            <a href="#" className="text-sm font-medium text-white hover:underline dark:text-primary-500">Forgot password?</a>
                                        </div>}
                                        <button type="submit" onClick={handleSubmit} className="w-full text-white bg-[#4A90E2] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">{signup ? <>Already Have an account ?</> : <>Don’t have an account yet? </>}
                                            <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500" onClick={() => setSignup(!signup)}>
                                                {signup ? <>Login</> : <>Sign up</>}
                                            </a>
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </section>
                    </GridBackgroundDemo>
            </div>
                <div className='h-full w-[10rem] absolute left-[44rem] z-40 bg-gradient-to-r from-[#060609] from-60% to-transparent'/>
                
                <div className='h-[21rem] top-[10rem] w-[5rem] rounded-b-full rounded-t-full absolute left-[42rem] z-40 bg-gradient-to-r from-[#0b0b12] from-10% to-[#060609]'/>
                <section className='w-[70%]'>
                        <img src={cyberpunk2} className='w-full h-full fixed'/>
                        <div className='absolute flex w-[46.5%] text-center items-center justify-center h-full'>
                            <h1 className='text-white absolute left-[8rem] text-[1.5rem] font-bold font-PressStart2p'>Welcome Back, Please Sign In to continue coding</h1>
                        </div>
                </section>
            </div>
            
        </>
    )
}

export default Login