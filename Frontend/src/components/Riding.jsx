import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useContext } from "react";
import { SocketContext } from "../context/SocketContext.jsx";
import { useNavigate } from "react-router-dom";
import LiveTracking from "./LiveTracking.js";

const Riding = () => {
  const location = useLocation();
  const ride = location.state?.ride;
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();

  socket.on('ride-ended', ()=>{
    navigate('/home');
  })
  return (
    <div className="h-screen ">
      <Link to='/home' className="fixed h-10 w-10 top-2 right-2 bg-white  rounded-full flex justify-center items-center z-10">
        <i className=" text-xl font-medium ri-home-4-line"></i>
      </Link>
      <div className="h-1/2 ">
        <LiveTracking/>
      </div>
      <div className="h-1/2 p-4">
        <div className="flex items-center justify-between">
          <img
            className="h-12"
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398986/assets/90/34c200-ce29-49f1-bf35-e9d250e8217a/original/UberX.png"
            alt=""
          />
          <div className="text-right">
            <h2 className="text-lg font-medium capitalize">{ride?.captain?.fullname?.firstname }</h2>
            <h4 className="text-xl font-semibold -mt-1 -mb-1">{ride?.captain.vehicle.plate }</h4>
            <p className="text-sm text-gray-600">{ride?.vehicleModel||"Maruti Suzuki " }</p>
          </div>
        </div>
        <div className="flex flex-col gap-2 justify-between items-center">
          <div className="w-full mt-5">
            <div className="flex items-center gap-5 p-3 border-b-2">
              <i className="text-lg ri-map-pin-user-fill"></i>
              <div>
                <h3 className="text-lg font-semibold capitalize">{ride?.destination }</h3>
                <p className="text-sm -mt-1 text-gray-600">
                  {ride?.pickupLocation }
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5 p-3 ">
              <i className="text-lg ri-money-rupee-circle-fill"></i>
              <div>
                <h3 className="text-lg font-semibold">{ride?.fare}</h3>
                <p className="text-sm -mt-1 text-gray-600">Total Fare</p>
              </div>
            </div>
          </div>
        </div>
        <button className='w-full mt-9 bg-green-600 text-white font-semibold p-2 rounded-lg '>Make a Payment</button>
      </div>
    </div>
  );
};

export default Riding;
