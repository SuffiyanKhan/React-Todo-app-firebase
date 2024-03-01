import React from 'react'
import AppSignup from '../Components/Signup/Signup'
import { auth,createUserWithEmailAndPassword } from '../Config/fireBaseConfig';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

export default function Signup() {
  const naviagte = useNavigate()
  let signup=(value)=>{
    createUserWithEmailAndPassword(auth, value.email, value.password)
  .then((userCredential) => {
    const user = userCredential.user;
    Swal.fire({
      title: "Signup Successfully!",
      icon: "success"
    }).then((result) =>{
      if(result){
        naviagte('/home')
      }
    })
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = errorCode.slice(5).toUpperCase();
    const errMessage = errorMessage.replace(/-/g, " ");
    Swal.fire({
      title: "Error!",
      text: errMessage + " " + "!",
      icon: "error"
    });    // ..
  });
  }


  return (
    <div>
    <AppSignup data={signup}/>
    </div>
  )
}
