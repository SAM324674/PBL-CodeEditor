import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='flex flex-col'>
      <div>Home</div>
      <Link to='/students/signin' className='text-blue-600'>Student Signin</Link>
      <Link to='/teachers/signin' className='text-blue-600'>Teacher Signin</Link>
    </div>
  )
}

export default Home