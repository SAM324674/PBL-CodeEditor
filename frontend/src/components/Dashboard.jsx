import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { GridBackgroundDemo } from './ui/GridBackground';

const Dashboard = () => {
  const location = useLocation();
  const [role, setRole] = useState('');
  const [submissions, setSubmissions] = useState([]);
  const navigate = useNavigate();

  // Function to get student submission data to display in teacher's dashboard
  const getStudentDetails = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://localhost:8000/teachers/submissions', {
        headers: {
          authorization: 'Bearer ' + token,
        },
      });
      console.log(response.data?.submissions);
      return response.data?.submissions;
    } catch (error) {
      console.error('Error fetching submissions:', error);
      return [];
    }
  };

  // Correct usage of useEffect to handle async function
  useEffect(() => {
    const fetchSubmissions = async () => {
      if (location.pathname === '/teachers/dashboard') {
        setRole('teachers');
        const data = await getStudentDetails();
        setSubmissions(data);
      } else if (location.pathname === '/students/dashboard') {
        setRole('students');
      } else {
        setRole('admin');
      }
    };

    fetchSubmissions(); // Call the async function inside useEffect
  }, [location.pathname]);

  //printing all values of localStorage
  console.log("LOCAL STORAGE");
  for (let key of Object.keys(localStorage)) {

    console.log(`${key}: ${localStorage.getItem(key)}`); 

  }

  return (
    <>

      <GridBackgroundDemo>
      {location.pathname === '/teachers/dashboard' && (
        <div className="border border-[#7289DA] bg-[#2B2D3C] m-5 text-white rounded-lg p-4 flex flex-col gap-4">
          <h1 className='font-bold text-2xl'>Students submitted</h1>
          <ul className='text-black'>
            <div className='flex  justify-around border-b-2 border-[#7289DA] text-white'>
                <h1 className='text-lg font-semibold'>Question No</h1>
                <h1 className='text-lg font-semibold'>Student Name</h1>
                <h1 className='text-lg font-semibold'>Marks Obtained</h1>
              </div>
            <div className='flex flex-col gap-2 mt-2'>
              {submissions.map((submission, index) => (
                <li key={index}>
                    <div className='flex justify-around border-b border-[#3a4671] text-white'>
                      <div className='w-[20%]  text-center'>{submission.questionId}</div>
                      <div className='w-[20%]  text-center'>{submission.firstName + " " + submission.lastName}</div>
                      <div className='w-[20%]  text-center'>{submission.evaluation}</div>
                    </div>
                </li>
              ))}
            </div>
          </ul>
        </div>
      )}

      {location.pathname === '/students/dashboard' && (
        <div>Student's Dashboard</div>
      )}

      {location.pathname === '/admin/dashboard' && (
        <div>Admin's Dashboard</div>
      )}
      </GridBackgroundDemo>
    </>
  );
};

export default Dashboard;
