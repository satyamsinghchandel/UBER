import React from 'react'

const ConfirmRide = (props) => {
  return (
    <div>
      <h5 
        onClick={()=>{
            props.setConfirmRidePanel(false)
        }}
        className='w-[93%] p-1 text-center absolute top-0'>
            <i className=" text-3xl  text-gray-500 ri-arrow-down-wide-line"></i>
        </h5>
        <h3 className='text-2xl flex justify-between font-semibold mb-5'> Confirm Ride </h3>
        <div className='flex flex-col gap-2 justify-between items-center'>
            <img className="h-20" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398986/assets/90/34c200-ce29-49f1-bf35-e9d250e8217a/original/UberX.png" alt="" />
            <div className='w-full mt-5'>
                <div className='flex items-center gap-5 p-3 border-b-2'>
                    <i className="text-lg ri-map-pin-user-fill"></i>
                    <div>
                        <h3 className='text-lg font-semibold'>562/11-A</h3>
                        <p className='text-sm -mt-1 text-gray-600'>{props.pickup}</p>
                    </div>
                    
                </div>
                <div className='flex items-center gap-5 p-3 border-b-2'>
                    <i className="text-lg ri-map-pin-2-fill"></i>
                    <div>
                        <h3 className='text-lg font-semibold'>562/11-A</h3>
                        <p className='text-sm -mt-1 text-gray-600'>{props.destination}</p>
                    </div>
                </div>
                <div className='flex items-center gap-5 p-3 '>
                    <i className="text-lg ri-money-rupee-circle-fill"></i>
                    <div>
                        <h3 className='text-lg font-semibold'>₹{props.fare[props.vehicleType]}</h3>
                        <p className='text-sm -mt-1 text-gray-600'>Total Fare</p>
                    </div>
                </div>
            </div>
            <button onClick={()=>{
                props.setVehicleFound(true)
                props.setConfirmRidePanel(false)
                props.createRide()
            }} className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg '>Confirm</button>
        </div>
    </div>
  )
}

export default ConfirmRide
