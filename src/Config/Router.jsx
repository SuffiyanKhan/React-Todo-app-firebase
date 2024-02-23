import React, { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Signup from '../Pages/Signup'
import Login from '../Pages/Login'
import Home from '../Pages/Home'
import { auth,onAuthStateChanged } from '../Config/fireBaseConfig'

export default function Router() {
  const [user, setUser] = useState(false)
  useEffect(()=>{
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          console.log(uid)
          setUser(true)
        } else {
        }
      });
  },[])
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={user ? <Navigate to={'/home'} /> : <Login />} />
        <Route path='/signup' element={user ? <Navigate to={'/home'} /> : <Signup />}/>
        <Route path='/home' element={user ?  <Home /> : <Navigate to={'/'} /> }/>
      </Routes>
    </BrowserRouter>
    </div>
  )
}
