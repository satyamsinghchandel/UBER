import React, { useState, useContext } from "react";
import { Link, useNavigate} from "react-router-dom";
import axios from "axios";
import { userDataContext } from "../Context/userContext";
const UserSignup = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [userData, setUserData] = useState({})
  const navigate = useNavigate()
  const {user, setUser} = useContext(userDataContext)

  const submitHandler = async (e)=>{
    e.preventDefault()
    const newUser = {
      fullname:{
        firstname:firstname,
        lastname:lastname
      },
      email:email,
      password:password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`,newUser)

    if(response.status === 201){
      const data = response.data
      setUser(data.user)
      localStorage.setItem('token', data.token)
      navigate('/home')
    }
    setEmail('');
    setFirstname('')
    setLastname('')
    setPassword('')
  }
  return (
    <div>
      <div className="p-7 h-screen flex flex-col justify-between">
        <div>
          <img
            className="w-16 mb-5"
            src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png"
            alt=""
          />
          <form 
          onSubmit={submitHandler}
          action="">
            <h3 className="text-lg mb-2  font-medium">What's your name </h3>
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
            <button className="bg-[#111] mb-3  text-white font-semibold rounded px-4 py-2   w-full text-base placeholder:text-sm ">
              Create Account
            </button>
          </form>

          <p className="text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600">
              Login here
            </Link>
          </p>
        </div>

        <div>
          <p className="text-[10px] leading-tight text-gray-500">
           This site is protected by reCaptcha and the Google Privacy Policy and Terms of Service apply
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserSignup;
