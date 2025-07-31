import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
   <div>
    <div className='bg-cover bg-center bg bg-[url(https://images.unsplash.com/photo-1619059558110-c45be64b73ae?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen pt-5  w-full flex justify-between flex-col'>
        <img className = "w-20 ml-8" src="https://www.edigitalagency.com.au/wp-content/uploads/Uber-logo-white-png-900x313.png" alt="" />
        <div className='bg-white pb-7 py-4 px-4'>
            <h2 className='text-3xl font-bold'>Get Started with Uber</h2>
            <Link to='/login' className='flex justify-center items-center w-full bg-black text-white py-3 rounded-lg mt-5'>Continue</Link>
        </div>
    </div>
   </div>
  )
}

export default Start
