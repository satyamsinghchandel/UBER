import React from 'react'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import Start from './pages/Start'
import UserProtectedWrapper from './pages/UserProtectedWrapper'
import UserLogout from './pages/UserLogout'
import CaptainHome from './pages/CaptainHome'
import CaptainProtectedWrapper from './pages/CaptainProtectedWrapper'
import CaptainLogout from './pages/CaptainLogout'
import Riding from './pages/Riding'
import CaptainRiding from './pages/CaptainRiding'

const App = () => {
  return (
    <div>
    <Routes>
      <Route path='/' element={<Start/>}/>
      <Route path='/login' element={<UserLogin/>}/>
      <Route path='/logout' element={<UserLogout/>}/>
      <Route path='/signup' element={<UserSignup/>}/>
      <Route path='/riding' element={<Riding/>}></Route>
      <Route path='/captain-login' element={<CaptainLogin/>}/>
      <Route path='/captain-logout' element={<CaptainLogout/>}/>
      <Route path='/captain-signup' element={<CaptainSignup/>}/>
      <Route path='/captain-riding' element={<CaptainRiding/>}></Route>
      <Route path='/home' element={
        <UserProtectedWrapper>
          <Home/>
        </UserProtectedWrapper>
      }/>
      <Route path='/users/logout' element = {
        <UserProtectedWrapper>
          <UserLogout/>
        </UserProtectedWrapper>
      }/>
      <Route path='/captain-home' element={
        <CaptainProtectedWrapper>
          <CaptainHome/>
        </CaptainProtectedWrapper>
      }/>

      <Route path='/captains/logout' element={
        <CaptainProtectedWrapper>
          <CaptainLogout/>
        </CaptainProtectedWrapper>
      }/>
      
      

    </Routes>
   
      
  </div>
  )
}

export default App
