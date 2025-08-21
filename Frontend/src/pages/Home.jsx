import React, { useRef, useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel.jsx";
import axios from "axios";
import VehiclePanel from "../components/VehiclePanel.jsx";
import ConfirmRide from "../components/ConfirmRide.jsx";
import LookingForDriver from "../components/LookingForDriver.jsx";
import WaitingForDriver from "../components/WaitingForDriver.jsx";
import { SocketContext } from "../context/SocketContext.jsx";
import { UserDataContext } from "../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";
import LiveTracking from "../components/LiveTracking.jsx";


const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null); // 'pickup' or 'destination'
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState({});
  const [ride, setRide] = useState(null);
  const [isInputFocused, setIsInputFocused] = useState(false);


  const navigate = useNavigate();

  const { sendMessage, onMessage, socket } = useContext(SocketContext);
  const { user } = useContext(UserDataContext);

  useEffect(() => {
    if (!user || !user._id) return;
    console.log("User:", user);
    sendMessage("join", { userType: "user", userId: user._id });
  }, [user, sendMessage]);

  socket.on("ride-confirmed", (ride) => {
    setWaitingForDriver(true);
    setVehicleFound(false);
    setVehiclePanel(false);
    setRide(ride);
  });

  socket.on("ride-started", (ride) => {
    setWaitingForDriver(false);
    navigate("/riding", { state: { ride } }); // Pass ride data here
  });

  const submitHandler = (e) => {
    e.preventDefault();
  };

  // Fetch suggestions from backend
  const fetchSuggestions = async (query, type) => {
    if (!query) {
      if (type === "pickup") setPickupSuggestions([]);
      else setDestinationSuggestions([]);
      return;
    }
    try {
      // Replace with your backend endpoint for suggestions
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: query },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(res.data);

      if (type === "pickup") setPickupSuggestions(res.data || []);
      else setDestinationSuggestions(res.data || []);
    } catch (err) {
      if (type === "pickup") setPickupSuggestions([]);
      else setDestinationSuggestions([]);
    }
  };

  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, {
          height: "70%",
          padding: 24,
        });
        gsap.to(panelCloseRef.current, {
          opacity: 1,
        });
      } else {
        gsap.to(panelRef.current, {
          height: "0%",
          padding: 0,
        });
        gsap.to(panelCloseRef.current, {
          opacity: 0,
        });
      }
    },
    [panelOpen]
  );

  useGSAP(
    function () {
      if (vehiclePanel) {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehiclePanel]
  );

  useGSAP(
    function () {
      if (confirmRidePanel) {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePanel]
  );

  useGSAP(
    function () {
      if (vehicleFound) {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehicleFound]
  );

  useGSAP(
    function () {
      if (waitingForDriver) {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [waitingForDriver]
  );

  async function findTrip() {
    setPanelOpen(false);
    setVehiclePanel(true);
    setIsInputFocused(false);
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
      {
        params: { pickup, destination },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    console.log(response.data);
    setFare(response.data);
  }

  async function createRide() {
    const token = localStorage.getItem("token");
    console.log(token);
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/create`,
      {
        pickup,
        destination,
        vehicleType: vehicleType,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(token);
    console.log(response.data);
  }

  return (
    <div className="h-screen relative overflow-hidden">
      <img
        className="w-16 absolute left-5 top-5 z-20 "
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt=""
      />
      <Link
        to="/logout"
        
        className="absolute right-5 top-5  bg-white w-8 h-8 flex justify-center items-center rounded-2xl z-20"
      >
        <i className=" text-xl font-medium ri-logout-box-r-line  "></i>
      </Link>

      <div className="h-[70%] absolute w-screen z-10 ">
        <LiveTracking />
      </div>
      <div className={`absolute h-full flex flex-col justify-end bottom-0 w-full transition-all ${
      isInputFocused ? "z-30" : "z-0"
    }`}>
        <div className="h-[30%] bg-white p-5  relative">
          <h5
            onClick={() => {
              setPanelOpen(false);
              setIsInputFocused(false);
            }}
            ref={panelCloseRef}
            className="absolute opacity-0 top-6 right-6 text-2xl"
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-2xl font-semibold ">Find a trip</h4>
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <div className="line absolute h-16 w-1 top-[43%] left-[10%] bg-gray-900 rounded-full"></div>
            <input
              onClick={() => {
                setPanelOpen(true);
                setActiveField("pickup");
                setIsInputFocused(true);
              }}
              value={pickup}
              onChange={(e) => {
                setPickup(e.target.value);
                setActiveField("pickup");
                fetchSuggestions(e.target.value, "pickup");
              }}
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5"
              type="text"
              placeholder="Add a pickup location"
            />
            <input
              onClick={() => {
                setPanelOpen(true);
                setActiveField("destination");
                setIsInputFocused(true);
              }}
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
                setActiveField("destination");
                fetchSuggestions(e.target.value, "destination");
              }}
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3"
              type="text"
              placeholder="Enter your Destination"
            />
          </form>
          <button
            onClick={findTrip}
            className="bg-black text-white px-4 py-2 rounded-lg w-full mt-3"
          >
            Find Trip
          </button>
        </div>
        <div ref={panelRef} className="h-[0%]  bg-white">
          <LocationSearchPanel
            setPanelOpen={setPanelOpen}
            setVehiclePanel={setVehiclePanel}
            suggestions={
              activeField === "pickup"
                ? pickupSuggestions
                : destinationSuggestions
            }
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField}
            setActiveField={setActiveField}
          />
        </div>
      </div>

      <div
        ref={vehiclePanelRef}
        className="fixed z-10 bottom-0 w-full translate-y-full bg-white px-3 py-5 pt-10 rounded-xl"
      >
        <VehiclePanel
          setConfirmRidePanel={setConfirmRidePanel}
          setVehiclePanel={setVehiclePanel}
          setPanelOpen={setPanelOpen}
          fare={fare}
          selectVehicle={setVehicleType}
        />
      </div>
      <div
        ref={confirmRidePanelRef}
        className="fixed z-10 bottom-0 w-full translate-y-full bg-white px-3 py-5 pt-10 rounded-xl"
      >
        <ConfirmRide
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicleFound={setVehicleFound}
          createRide={createRide}
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
        ></ConfirmRide>
      </div>

      <div
        ref={vehicleFoundRef}
        className="fixed z-10 bottom-0 w-full translate-y-full bg-white px-3 py-5 pt-10 rounded-xl"
      >
        <LookingForDriver
          setVehicleFound={setVehicleFound}
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
        ></LookingForDriver>
      </div>

      <div
        ref={waitingForDriverRef}
        className="fixed z-10 bottom-0 w-full translate-y-full bg-white px-3 py-5 pt-10 rounded-xl"
      >
        <WaitingForDriver
          setWaitingForDriver={setWaitingForDriver}
          ride={ride}
        ></WaitingForDriver>
      </div>
    </div>
  );
};

export default Home;
