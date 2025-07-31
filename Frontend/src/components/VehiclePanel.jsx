import React from 'react'

const VehiclePanel = (props) => {
  return (
    <div>
        <h5 
        onClick={()=>{
            props.setVehiclePanel(false)
            props.setPanelOpen(true)
        }}
        className='w-[93%] p-1 text-center absolute top-0'>
            <i className=" text-3xl  text-gray-500 ri-arrow-down-wide-line"></i>
        </h5>
        <h3 className='text-2xl flex justify-between font-semibold mb-5'> Choose a Ride </h3>
        <div onClick={()=>{
            props.setConfirmRidePanel(true)
            props.selectVehicle('car')
        }} className='flex w-full  p-3 items-center justify-between border-2 active:border-black rounded-xl mb-2'>
            <img 
            className = 'h-12'
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398986/assets/90/34c200-ce29-49f1-bf35-e9d250e8217a/original/UberX.png" alt="" />

            <div className=' w-1/2'>
                <h4 className='font-medium text-base'>UberGo <span><i className="ri-user-3-fill"></i> 4 </span>
                 </h4>
                 <h5 className='font-medium text-sm'>2 mins away</h5>
                 <p className=' font-normal text-xs text-gray-600'>Affordable compact Rides</p>
            </div>
            <h2 className='text-lg font-semibold'>₹{props.fare.car}</h2>
        </div>
        <div onClick={()=>{
            props.setConfirmRidePanel(true)
            props.selectVehicle('motorcycle')
        }} className='flex w-full  p-3 items-center justify-between border-2 active:border-black rounded-xl mb-2'>
            <img 
            className = 'h-12'
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="" />

            <div className=' w-1/2'>
                <h4 className='font-medium text-base'>Moto <span><i className="ri-user-3-fill"></i> 4 </span>
                 </h4>
                 <h5 className='font-medium text-sm'>4 mins away</h5>
                 <p className=' font-normal text-xs text-gray-600'>Affordable Motorcycle Rides</p>
            </div>
            <h2 className='text-lg font-semibold'>₹{props.fare.motorcycle}</h2>
        </div>
        <div onClick={()=>{
            props.setConfirmRidePanel(true)
            props.selectVehicle('auto')
        }} className='flex w-full  p-3 items-center justify-between border-2 active:border-black rounded-xl mb-2'>
            <img 
            className = 'h-12'
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="" />

            <div className=' w-1/2'>
                <h4 className='font-medium text-base'>UberAuto <span><i className="ri-user-3-fill"></i> 4 </span>
                 </h4>
                 <h5 className='font-medium text-sm'>5 mins away</h5>
                 <p className=' font-normal text-xs text-gray-600'>Affordable Auto Rides</p>
            </div>
            <h2 className='text-lg font-semibold'>₹{props.fare.auto}</h2>
        </div>
        
    </div>
  )
}

export default VehiclePanel
