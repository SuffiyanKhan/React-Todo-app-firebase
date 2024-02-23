import React from 'react'
import AppLogin from '../Components/Login/Login'
import { auth,signInWithEmailAndPassword } from '../Config/fireBaseConfig';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate()
    let login=(value)=>{
      signInWithEmailAndPassword(auth, value.email, value.password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user)
    navigate('/home')
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = errorCode.slice(5).toUpperCase();
    const errMessage = errorMessage.replace(/-/g, " ");
    console.log(errMessage)
  });
        console.log(value)
    }
  return (
    <div>
        <AppLogin data={login} />
    </div>
  )
}
