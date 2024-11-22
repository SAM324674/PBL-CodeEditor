import React, { useEffect, useState } from 'react';
import axios from 'axios'
import {format} from 'date-fns'
// import { questions } from '../questions';
const ViewWindow = (props) => {
  const {viewDetails,setViewDetails,index,setViewToggle,viewToggle}=props;

  return (
    <div className="h-full p-5 w-[100%] flex justify-center items-center inset-0 absolute z-40 bg-black bg-opacity-55 backdrop-blur-sm">
      <div className="bg-[#2B2D3C] h-[20rem] w-[80%]">
        <div className="flex flex-col items-center h-full overflow-hidden p-5 justify-center border rounded-md border-[#7289DA] gap-5">
          <div className="w-full h-[80%] flex items-center flex-col gap-4">
                <h1 className='text-xl font-bold'>{viewDetails.question}</h1>
                <p><span className='font-bold'>Deadline : </span>{new Date(viewDetails.deadline).toLocaleDateString()}</p>
                <p><span className='font-bold'>Submissions : </span></p>
                {/* <div className='overflow-y-scroll '>
                    {submissionDetails.map((submission,index)=>(
                          <div key={index}>
                                {submission}
                          </div>
                    ))}
                </div> */}
          </div>
          <div className="flex w-[85%] justify-between">
            <button
              type="button"
              className="flex text-white gap-2 bg-[#3c4161] w-[20%] justify-center items-center h-10 p-3 rounded-[0.25rem]"
              onClick={() => setViewToggle(null)} // Example for handling close
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewWindow;
