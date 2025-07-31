import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const CaptainLogout = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    // blocking the token which is present now and deleting it from local storage
    
    axios.get(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {
        headers: {
            Authorization:`Bearer ${token}`
        }
    }).then(()=>{
        localStorage.removeItem('token')
        navigate('/captain-login')
    })
  
    return (
    <div>
      
    </div>
  )
}

export default CaptainLogout
