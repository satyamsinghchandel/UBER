import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const ConfirmRidePopup = (props) => {
  console.log(props)
  const navigate = useNavigate();
  const [otp, setOtp] = useState("")
  const submitHandler = async(e)=>{
    e.preventDefault()
    
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, 
     { params: {
        rideId: props.ride?._id,
        otp: otp
      },
      
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
   if(response.status === 200){
      console.log("Ride confirmed successfully")
      props.setConfirmRidePopupPanel(false);
      props.setRidePopupPanel(false);
      
      navigate('/captain-riding', { state: { ride: props.ride } }); // Pass ride data here
    }

  }
  return (
    <div>
      <h5
        onClick={() => {
          props.setConfirmRidePopupPanel(false);
        }}
        className="w-[93%] p-1 text-center absolute top-0"
      >
        <i className=" text-3xl  text-gray-500 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl flex justify-between font-semibold mb-5">
        {" "}
        Confirm this Ride to start{" "}
      </h3>
      <div className="flex items-center justify-between mt-8 p-3 rounded-lg bg-yellow-300">
        <div className="flex items-center gap-3 ">
          <img
            className="h-10 w-10  rounded-full object-cover"
            src="https://thumbs.dreamstime.com/b/close-up-young-man-white-background-boy-looking-camera-feeling-confident-58696957.jpg"
            alt=""
          />
          <h2 className="text-lg font-medium">{props.ride?.user?.fullname?.firstname}</h2>
        </div>
        <h5>2.2 KM</h5>
      </div>

      <div className="flex flex-col gap-2 justify-between items-center">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-lg font-semibold">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {props.ride?.pickup}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-semibold">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {props.ride?.destination}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 ">
            <i className="text-lg ri-money-rupee-circle-fill"></i>
            <div>
              <h3 className="text-lg font-semibold">{props.ride?.fare}</h3>
              <p className="text-sm -mt-1 text-gray-600"></p>
            </div>
          </div>
        </div>

        <div className="mt-6 w-full">
          <form onSubmit={(e)=>{
            
            submitHandler(e)
          }}>
            <input value={otp} onChange={(e)=>{setOtp(e.target.value)}} type="text"  placeholder="Enter OTP"
             className='bg-[#eee] px-6 py-4 font-mono text-base rounded-lg w-full mt-5'/>
            <button
              className="flex items-center justify-center w-full mt-5 text-lg bg-green-600 text-white font-semibold p-2 rounded-lg "
            >
              Confirm
            </button>
            <button
              onClick={() => {
                props.setConfirmRidePopupPanel(false);
              }}
              className="w-full mt-5 text-lg bg-red-600 text-white font-semibold p-2 rounded-lg "
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRidePopup;
