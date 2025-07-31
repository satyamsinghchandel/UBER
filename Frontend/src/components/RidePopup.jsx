import React from 'react'

const RidePopup = (props) => {
  console.log("Ride POPUP: ", props.ride)
  return (
    <div>
      <h5 
        onClick={()=>{
            props.setRidePopupPanel(false)
        }}
        className='w-[93%] p-1 text-center absolute top-0'>
            <i className=" text-3xl  text-gray-500 ri-arrow-down-wide-line"></i>
        </h5>
        <h3 className='text-2xl flex justify-between font-semibold mb-5'> New Ride Available! </h3>
        <div className='flex items-center justify-between mt-8 p-3 rounded-lg bg-yellow-300'>
            <div className='flex items-center gap-3 '>
              <img className='h-10 w-10  rounded-full object-cover' src="https://thumbs.dreamstime.com/b/close-up-young-man-white-background-boy-looking-camera-feeling-confident-58696957.jpg" alt="" />
              <h2 className='text-lg font-medium'>{props.ride?.user?.fullname?.firstname + " " + props.ride?.user?.fullname?.lastname}</h2>
            </div>
            <h5>2.2 KM</h5>
        </div>

        <div className='flex flex-col gap-2 justify-between items-center'>
          
            <div className='w-full mt-5'>
                <div className='flex items-center gap-5 p-3 border-b-2'>
                    <i className="text-lg ri-map-pin-user-fill"></i>
                    <div>
                        <h3 className='text-lg font-semibold'>562/11-A</h3>
                        <p className='text-sm -mt-1 text-gray-600'>{props.ride?.pickup}</p>
                    </div>
                    
                </div>
                <div className='flex items-center gap-5 p-3 border-b-2'>
                    <i className="text-lg ri-map-pin-2-fill"></i>
                    <div>
                        <h3 className='text-lg font-semibold'>562/11-A</h3>
                        <p className='text-sm -mt-1 text-gray-600'>{props.ride?.destination}</p>
                    </div>
                </div>
                <div className='flex items-center gap-5 p-3 '>
                    <i className="text-lg ri-money-rupee-circle-fill"></i>
                    <div>
                        <h3 className='text-lg font-semibold'>192.80</h3>
                        <p className='text-sm -mt-1 text-gray-600'>{props.ride?.fare}</p>
                    </div>
                </div>
            </div>
            <div className='flex w-full gap-14 pt-5'>
            <button onClick={()=>{
            props.setRidePopupPanel(false)
        }}  className='w-full  bg-gray-300 text-gray-700 font-semibold p-2 rounded-lg '>Ignore</button>
            <button  onClick={()=>{
            props.setConfirmRidePopupPanel(true)
            props.setRidePopupPanel(false)
            props.confirmRide()
        }} className='w-full  bg-green-600 text-white font-semibold p-2 rounded-lg '>Accept</button>
            </div>
        </div>
    </div>
  )
}

export default RidePopup
