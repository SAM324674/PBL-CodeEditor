import React from 'react';
import { Link } from 'react-router-dom';
import { questions } from './questions';

const QuestionsSideSection = () => {
  return (
    <div className='flex w-[40%] m-0 absolute'>
      <section className='w-full border flex flex-col items-start bg-[#455073] text-white h-full'>
        {questions.map((item, index) => (
          <Link to={`/students/labs/CodeEditor/question/${item.id}`} key={index} className='p-4 w-[100%]'>
            <div className='flex items-center justify-around w-[100%]'>
              <p className='w-[30%]'>{item.id}</p>
              <p className='w-[70%]'>{item.question}</p>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
};

export default QuestionsSideSection;
