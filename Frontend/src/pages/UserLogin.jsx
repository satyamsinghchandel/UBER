import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserDataContext } from "../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const UserLogin = () => {

  const[email, setEmail] = useState("") 
  const[password, setPassword] = useState("")
  const [userData, setUserData] = useState({})
  const {user,setUser} = useContext(UserDataContext)
  const navigate = useNavigate()


  const submitHandler = async (e)=>{
    e.preventDefault()
    const userData = {
      email:email,
      password:password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData)
    if(response.status === 200){
      const data = response.data
      setUser(data.user) 
      localStorage.setItem('token', data.token)
      navigate('/home')
    }
    console.log(userData)
    setEmail("")
    setPassword("")
  }
  

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-16 mb-5"
          src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png"
          alt=""
        />
        <form 
        onSubmit = {submitHandler}
        action="">
          <h3 className="text-lg mb-2  font-medium">What's your email</h3>
          <input
            value = {email}
            onChange={(e)=>{
              setEmail(e.target.value)
            }}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border-black border w-full text-lg placeholder:text-base "
            type="email"
            required
            placeholder="email@example.com"
          />
          <h3 className="text-lg mb-2 font-medium">Enter Password</h3>
          <input
            value = {password}
            onChange={(e)=>{
              setPassword(e.target.value)
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

        <p className="text-center">New here? <Link to='/signup' className="text-blue-600">Create new Account</Link></p>
      </div>

      <div>
        <Link 
        to='/captain-login'
        className="bg-[#10b461] mb-5 flex justify-center items-center  text-white font-semibold rounded px-4 py-2 border-black  w-full text-lg placeholder:text-base ">Sign in as Captain</Link>
      </div>
    </div>
  );
};

export default UserLogin;
