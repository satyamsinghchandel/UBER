import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const CaptainSignup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [vehicleColor,setVehicleColor] = useState('')
  const [vehiclePlate,setVehiclePlate] = useState('')
  const [vehicleCapacity,setVehicleCapacity] = useState('')
  const [vehicleType,setVehicleType] = useState('')

  const navigate = useNavigate()
   
  const {captain, setCaptain} = useContext(CaptainDataContext)

  const submitHandler = async (e)=>{
    e.preventDefault()

    const captainData = {
      fullname:{
        firstname:firstname,
        lastname:lastname
      },
      email:email,
      password:password,
      vehicle:{
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType
      }
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData)
    if(response.status===201){
      const data = response.data;
      setCaptain(data.captain)
      localStorage.setItem('token', data.token)
      navigate('/captain-home')
      
    }
    

    console.log(captainData)
    setEmail('');
    setFirstname('')
    setLastname('')
    setPassword('')
    setVehicleColor('')
    setVehiclePlate('')
    setVehicleCapacity('')
    setVehicleType('')
  }
  return (
    <div>
      <div className="p-7 h-screen flex flex-col justify-between">
        <div>
          <img
            className="w-16 mb-5"
            src="https://pngimg.com/d/uber_PNG24.png"
            alt=""
          />
          <form 
          onSubmit={submitHandler}
          action="">
            <h3 className="text-lg mb-2  font-medium">Captain's name </h3>
            <div className="flex gap-4 mb-6">
              <input
                className="bg-[#eeeeee]  rounded px-4 py-2  border w-1/2 text-lg placeholder:text-base "
                type="text"
                required
                placeholder="Firstname"
                value = {firstname}
                onChange={(e)=>{
                  setFirstname(e.target.value)
                }}
              />

              <input
                className="bg-[#eeeeee] rounded px-4 py-2  border w-1/2 text-lg placeholder:text-base "
                type="text"
                required
                placeholder="Lastname"
                value = {lastname}
                onChange={(e)=>{
                  setLastname(e.target.value)
                }}
              />
            </div>

            <h3 className="text-lg mb-2  font-medium">What's your email </h3>
            <input
              className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base "
              type="email"
              required
              placeholder="email@example.com"
              value = {email}
                onChange={(e)=>{
                  setEmail(e.target.value)
                }}
            />
            <h3 className="text-lg mb-2 font-medium">Enter Password</h3>
            <input
              className="bg-[#eeeeee] mb-6 rounded px-4 py-2  border w-full text-lg placeholder:text-base "
              required
              type="password"
              placeholder="password"
              value = {password}
                onChange={(e)=>{
                  setPassword(e.target.value)
                }}
            />

            <h3 className="text-lg mb-2 font-medium">Vehicle Information</h3>
            <div className="flex gap-4 mb-6">
              <input
                className="bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base"
                type="text"
                required
                placeholder="Vehicle Color"
                value={vehicleColor}
                onChange={(e) => setVehicleColor(e.target.value)}
              />
              <input
                className="bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base"
                type="text"
                required
                placeholder="Vehicle Plate"
                value={vehiclePlate}
                onChange={(e) => setVehiclePlate(e.target.value)}
              />
            </div>
            <div className="flex gap-4 mb-6">
              <input
                className="bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base"
                type="number"
                min="1"
                required
                placeholder="Vehicle Capacity"
                value={vehicleCapacity}
                onChange={(e) => setVehicleCapacity(e.target.value)}
              />
              <select
                className="bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-m placeholder:text-base"
                required
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
              >
                
                <option 
                className=''
                value="" disabled>
                  Select Vehicle Type
                </option>
                <option value="car">Car</option>
                <option value="auto">Auto</option>
                <option value="moto">Moto</option>
              </select>
            </div>
            <button className="bg-[#111] mb-3  text-white font-semibold rounded px-4 py-2   w-full text-base placeholder:text-sm ">
              Create Account
            </button>
          </form>

          <p className="text-center mb-10">
            Already have an account?{" "}
            <Link to="/captain-login" className="text-blue-600">
              Login as captain
            </Link>
          </p>
        </div>

        <div>
          <p className="text-[10px] leading-tight text-gray-500 mb-5">
          This site is protected by reCaptcha and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of Service apply</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default CaptainSignup
