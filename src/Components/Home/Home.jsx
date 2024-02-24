
import React, { useEffect } from 'react'
import Todo from '../Todo.jsx/Todo';
import './Home.css'
import { auth, onAuthStateChanged } from '../../Config/fireBaseConfig'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

export default function AppHome() {
  const navigate = useNavigate();

  useEffect(() => {
   

    onAuthStateChanged(auth, (user) => {
      if (user) {
        const user = auth.currentUser;
        const uid = user.uid
      } else {
        navigate('/')
      }
    });
  }, []);


let logout=()=>{
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, Logout !"
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Log out!",
        icon: "success"
      }).then(async(result) => {
        if(result){
           auth.signOut().then(() => {
    window.location.reload()
    navigate('/')
    console.log('successfully')
  })
        }
      })
    }
  });    
  
}

  return (
    <div>
      <header>
        <div className="heading">
          <h2>Todo List</h2>
        </div>
        <div className="icon">
        <i class="fa-solid fa-right-from-bracket" onClick={logout}></i>
        </div>
      </header>
      <Todo/>
    </div>
  );
}
