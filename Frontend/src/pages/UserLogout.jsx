import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const UserLogout = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    // blocking the token which is present now and deleting it from local storage
    
    axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
        headers: {
            Authorization:`Bearer ${token}`
        }
    }).then(()=>{
        localStorage.removeItem('token')
        navigate('/login')
    })
  
    return (
    <div>
      
    </div>
  )
}

export default UserLogout
