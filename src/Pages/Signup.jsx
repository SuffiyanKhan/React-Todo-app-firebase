import React from 'react'
import AppSignup from '../Components/Signup/Signup'
import { auth,createUserWithEmailAndPassword } from '../Config/fireBaseConfig';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const naviagte = useNavigate()
  let signup=(value)=>{
    createUserWithEmailAndPassword(auth, value.email, value.password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log(user)
    naviagte('/home')

    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = errorCode.slice(5).toUpperCase();
    const errMessage = errorMessage.replace(/-/g, " ");
    console.log(errMessage)
    // ..
  });
    // console.log(value)
  }
  // email,password,full name,phone number


  return (
    <div>
    <AppSignup data={signup}/>
    </div>
  )
}
