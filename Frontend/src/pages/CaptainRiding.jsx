import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import FinishRide from '../Components/FinishRide.jsx';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import LiveTracking from '../Components/LiveTracking.jsx';

const CaptainRiding = () => {
  const [finishRidePanel, setFinishRidePanel] = useState(false)
  const finishRidePanelRef = useRef(null)
  const location = useLocation();
  const rideData = location.state?.ride || {}; // Get ride data from location state
  console.log(rideData);
  useGSAP(function(){
        if(finishRidePanel){
            gsap.to(finishRidePanelRef.current,{
              transform: 'translateY(0)'
            })
        }
        else{
            gsap.to(finishRidePanelRef.current,{
              transform: 'translateY(100%)'
            })
        }
        
    },[finishRidePanel])

  return (
    <div className="h-screen relative ">
      
      <div className="fixed p-6 pt-4 top-0 flex items-center justify-between w-screen z-10">
        <img
          className="w-16 "
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <Link
          to="/captain-home"
          className=" h-10 w-10  bg-white  rounded-full flex justify-center items-center"
        >
          <i className=" text-xl font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className="h-4/5">
        <LiveTracking/>
      </div>
      <div className=" relative h-1/5 p-6 flex items-center justify-between bg-yellow-400 pt-10"
      onClick={()=>
        setFinishRidePanel(true)
      }
      >
        <h5 
        onClick={()=>{
            
        }}
        className='w-screen p-1 text-center absolute top-0 left-0'>
            <i className=" text-3xl  text-black ri-arrow-up-wide-line"></i>
        </h5>
        <h4 className='text-xl font-semibold mt-2'>4 KM away</h4>
        <button className=' px-10 p-3 mt-2 bg-green-600 text-white font-semibold  rounded-lg '>Complete Ride</button>
      </div>
      <div  ref={finishRidePanelRef} className='fixed z-10 bottom-0 w-full  translate-y-full bg-white px-3 py-5 pt-10 '>
                                                
        <FinishRide setFinishRidePanel= {setFinishRidePanel}  ride={rideData}/>
      </div>

    </div>
  );
}

export default CaptainRiding
