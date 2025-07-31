import React, { useRef, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import RidePopup from "../components/RidePopup";
import {useGSAP} from '@gsap/react'
import gsap from "gsap";
import ConfirmRidePopup from "../components/ConfirmRidePopup";
import { SocketContext } from "../context/SocketContext";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";
import LiveTracking from "../components/LiveTracking";


const CaptainHome = () => {

  const [ridePopupPanel, setRidePopupPanel] = useState(false)
  const [confirmRidePopupPanel,setConfirmRidePopupPanel] = useState(false)
  const [ride, setRide] = useState({})
  const ridePopupPanelRef = useRef(null)
  const confirmRidePopupPanelRef = useRef(null)

  const {sendMessage, onMessage, socket} = useContext(SocketContext)
  const {captain} = useContext(CaptainDataContext)
  

  
  //connecting captain to socket server
  useEffect(() => {
    if (!captain || !socket) return; 
    sendMessage('join', {userType:'captain', userId:captain._id})
    
    const updateLocation = ()=>{
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position)=>{
          const {latitude, longitude} = position.coords;

          sendMessage('update-location-captain', {
            userId: captain._id,
            location: {
              ltd: latitude,
              lng: longitude
            }
          });
        }, (error) => {
          console.error("Error getting location:", error);
        });
      }
    }

    const locationInterval = setInterval(updateLocation, 10000); // Update every 5 seconds
    updateLocation(); // Initial call to set location immediately

    
    socket.on('new-ride', (data) => {
    console.log("🚗 New ride received:", data);
    setRide(data);
    setRidePopupPanel(true);
    });
    console.log("socket connected")


  }, [socket, captain, sendMessage]);

  async function confirmRide(){
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {
      rideId: ride._id,
      captainId: captain._id
      }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })

    

    setRidePopupPanel(false);
    setConfirmRidePopupPanel(true);
    setRide(response.data.ride);
    console.log("confirm ride section:", ride)
  }

 
 
  useGSAP(function(){
        if(confirmRidePopupPanel){
            gsap.to(confirmRidePopupPanelRef.current,{
              transform: 'translateY(0)'
            })
        }
        else{
            gsap.to(confirmRidePopupPanelRef.current,{
              transform: 'translateY(100%)'
            })
        }
        
    },[confirmRidePopupPanel])


  useGSAP(function(){
        if(ridePopupPanel){
            gsap.to(ridePopupPanelRef.current,{
              transform: 'translateY(0)'
            })
        }
        else{
            gsap.to(ridePopupPanelRef.current,{
              transform: 'translateY(100%)'
            })
        }
        
    },[ridePopupPanel])
  return (
    <div className="h-screen ">
      <div className="fixed p-6 pt-4 top-0 flex items-center justify-between w-screen z-20">
        <img
          className="w-16 "
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <Link
          to="/captain-logout"
          className=" h-10 w-10  bg-white  rounded-full flex justify-center items-center"
        >
          <i className=" text-xl font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className="h-3/5 relative z-0">
        <LiveTracking />
      </div>
      <div className="h-2/5 p-6 z-20">
        <CaptainDetails></CaptainDetails>
      
      <div  ref={ridePopupPanelRef} className='fixed z-30 left-0 bottom-0 w-full translate-y-full bg-white px-3 py-5 pt-10 rounded-xl'>
        <RidePopup setConfirmRidePopupPanel={setConfirmRidePopupPanel} setRidePopupPanel={setRidePopupPanel} ride={ride} confirmRide={confirmRide}></RidePopup>
      </div>

      <div  ref={confirmRidePopupPanelRef} className='fixed z-30 left-0 bottom-0 w-full h-screen translate-y-full bg-white px-3 py-5 pt-10 rounded-xl'>
        <ConfirmRidePopup setConfirmRidePopupPanel={setConfirmRidePopupPanel} setRidePopupPanel={setRidePopupPanel} ride={ride}></ConfirmRidePopup>
      </div>
      </div>

    </div>
  );
};

export default CaptainHome;
