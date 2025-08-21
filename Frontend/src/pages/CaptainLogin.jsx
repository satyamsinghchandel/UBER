import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../Context/CaptainContext.jsx";
const CaptainLogin = () => {

  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const {captain, setCaptain} = useContext(CaptainDataContext)
  const submitHandler = async(e) => {
    e.preventDefault();
    const captain = {
      email: email,
      password: password,
    };
    
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captain)
    if(response.status === 200){
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem('token', data.token)
      navigate('/captain-home')
    }
    
    setEmail("");
    setPassword("");
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-16 mb-5"
          src="https://pngimg.com/d/uber_PNG24.png"
          alt=""
        />
        <form onSubmit={submitHandler} action="">
          <h3 className="text-lg mb-2  font-medium">What's your email</h3>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border-black border w-full text-lg placeholder:text-base "
            type="email"
            required
            placeholder="email@example.com"
          />
          <h3 className="text-lg mb-2 font-medium">Enter Password</h3>
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border-black border w-full text-lg placeholder:text-base "
            required
            type="password"
            placeholder="password"
          />
          <button className="bg-[#111] mb-3  text-white font-semibold rounded px-4 py-2 border-black  w-full text-lg placeholder:text-base ">
            Login
          </button>
        </form>

        <p className="text-center">
          Join a fleet? <Link to="/captain-signup" className="text-blue-600">
            Register as a captain
          </Link>
        </p>
      </div>

      <div>
        <Link
          to="/login"
          className="bg-[#dca705] mb-5 flex justify-center items-center  text-white font-semibold rounded px-4 py-2 border-black  w-full text-lg placeholder:text-base "
        >
          Sign in as User
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;
