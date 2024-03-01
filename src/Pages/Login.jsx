import React from 'react'
import AppLogin from '../Components/Login/Login'
import { auth,signInWithEmailAndPassword } from '../Config/fireBaseConfig';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
export default function Login() {
  const navigate = useNavigate()
    let login=(value)=>{
      signInWithEmailAndPassword(auth, value.email, value.password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    Swal.fire({
      title: "Login is successfully!",
       icon: "success"
    }).then((result)=>{
      if(result){
        navigate('/home')
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
    });
  });
  }
  return (
    <div>
        <AppLogin data={login} />
    </div>
  )
}
