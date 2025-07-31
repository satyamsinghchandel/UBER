import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'
const CaptainProtectedWrapper = ({children}) => {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const {captain, setCaptain} = useContext(CaptainDataContext)
  const [isLoading, setIsLoading] = useState(true)
  useEffect(()=>{
    if(!token){
        navigate('/captain-login')
    }
    axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }).then((res)=>{
        if(res.status===200){
            setCaptain(res.data.captain)
            setIsLoading(false)
        }
    }).catch((err)=>{
        console.log(err);
        localStorage.removeItem('token')
        navigate('/captain-login')
    })
  }, [token])


  if(isLoading){
    return (
        <div>Loading...</div>
    )
  }

  return (
    <>
      {children}
    </>
  )
}

export default CaptainProtectedWrapper
