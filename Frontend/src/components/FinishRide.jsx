import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const FinishRide = (props) => {
  const navigate = useNavigate();
  async function endRide() {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/end-ride`,
      {
        rideId: props.ride?._id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.status === 200) {
      navigate("/captain-home");
    }
  }
  return (
    <div>
      <h5
        onClick={() => {
          props.setFinishRidePanel(false);
        }}
        className="w-[93%] p-1 text-center absolute top-0"
      >
        <i className=" text-3xl  text-gray-500 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl flex justify-between font-semibold mb-5">
        {" "}
        Finish this Ride{" "}
      </h3>
      <div className="flex items-center justify-between mt-8 p-4 border-2 rounded-lg border-yellow-300">
        <div className="flex items-center gap-3 ">
          <img
            className="h-10 w-10  rounded-full object-cover"
            src="https://thumbs.dreamstime.com/b/close-up-young-man-white-background-boy-looking-camera-feeling-confident-58696957.jpg"
            alt=""
          />
          <h2 className="text-lg font-medium">
            {props.ride?.user?.fullname?.firstname}
          </h2>
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
              <p className="text-sm -mt-1 text-gray-600">Total Fare</p>
            </div>
          </div>
        </div>

        <div className="mt-6 w-full">
          <button
            onClick={endRide}
            className="flex items-center justify-center w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg "
          >
            Finish Ride
          </button>
          <p className="mt-6 text-sm">
            click on finish ride if you have recieved the payment
          </p>
        </div>
      </div>
    </div>
  );
};

export default FinishRide;
