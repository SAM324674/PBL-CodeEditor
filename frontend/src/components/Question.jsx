import React from 'react';
import { useParams } from 'react-router-dom';
import { questions } from './questions';

const Question = () => {
  const { questionId } = useParams();
  console.log("question Id from URL",questionId)
  const question = questions.find(q => q.id === parseInt(questionId));
  console.log("Question component loaded");
  console.log("question:",question);

  if (!question) {
    return <div>Question not found</div>;
  }

  return (
    <div className='w-[100%] border p-5 bg-[#1e1e1e] h-full text-white overflow-scroll'>
      <div className='flex gap-2'>
          <h1 className='text-2xl font-bold'>{questionId}.</h1>
          <h1 className='text-2xl font-bold'>{question.question}</h1>
      </div>
      {/* Render test cases or any other relevant info */}
      <div className=' mt-5 p-5 gap-5 flex flex-col'>
       
        {question.testCases.map((testCase, index) => (
           
          <div key={index} className=' bg-gray-700 bg-opacity-45 rounded-lg p-5'>
            <h1 className='font-bold'>Example:{index+1}</h1>
            <div className='flex gap-3'>
              <p className='font-semibold'>Input: </p>
              <span>{JSON.stringify(testCase.input)}</span>
            </div>
            <div className='flex gap-3'>
              <p className='font-semibold'>Expected:</p>
              <span> {JSON.stringify(testCase.expected)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Question;
