import React from 'react'
import { questions } from './questions'
const QuestionsSection = () => {
  return (
    <>
        <div className='flex w-[20%] m-0'>
            <section className='w-full border flex flex-col items-start  bg-[#455073] text-white h-[92vh]'>
                
                {questions.map((items,index)=> 
                <Link to={questions.Links[index]} key={index} className='p-4 w-[100%]'>
                    <div className='flex items-center justify-around w-[100%]'>
                        {/* <div className='w-[1%] '>{items}</div> */}
                        <p className='w-[70%] '>{items}</p>
                    </div> 
                </Link>)
                }
                
                
            </section>
        </div>
    </>
  )
}

export default QuestionsSection