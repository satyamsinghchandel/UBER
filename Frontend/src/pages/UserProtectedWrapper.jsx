import React, {useContext, useEffect, useState} from 'react'
import { UserDataContext } from '../Context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const UserProtectedWrapper = ({children}) => {
  
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const {user, setUser} = useContext(UserDataContext)
  const [isLoading, setIsloading] = useState(true)
  useEffect(()=>{
    if(!token){
      navigate('/login')
    }
    axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }).then((res)=>{
        if(res.status === 200){
            setUser(res.data)
            setIsloading(false)
        }
    }).catch((err)=>{
        console.log(err)
        localStorage.removeItem('token')
        navigate('/login')
    })
    
  }, [token])
 
  if(isLoading){
    return(
        <div>
            Loading...
        </div>
    )
  }

  return (
    <>
    {children}
    </>
  )
}

export default UserProtectedWrapper
