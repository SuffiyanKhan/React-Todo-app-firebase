
import React, { useEffect, useState } from 'react'
import Todo from '../Todo.jsx/Todo';
import './Home.css'
// import { auth, deleteUser, onSnapshot, doc, db, onAuthStateChanged, getDoc } from '../../Config/fireBaseConfig'
// import { useNavigate } from 'react-router-dom'

export default function AppHome() {
//   const navigate = useNavigate();
//   const [users, setUser] = useState('');

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const user = auth.currentUser;
//         if (user) {
//           const uid = user.uid;
//           setUser(uid);
//           const unsub = onSnapshot(doc(db, "Users", uid), (doc) => {
//             console.log("Current data: ", doc.data());
//         });
        
//         }
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };

//     onAuthStateChanged(auth, (user) => {
//       if (user) {
//         fetchUserData();
//       } else {
//         // Handle the case when the user is not authenticated
//       }
//     });
//   }, []);

//   const handleLogout = () => {
//     deleteUser(auth.currentUser)
//       .then(() => {
//         console.log('Successfully logged out');
//       })
//       .catch((error) => {
//         console.error('Error logging out:', error);
//       });
//   };

  return (
    <div>
      <h2>Todo</h2>
      <Todo/>
    </div>
  );
}
