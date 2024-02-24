import React, { useEffect, useState } from 'react'
import "./Todo.css"
import { collection, addDoc, db, onAuthStateChanged, auth, onSnapshot,  query, orderBy,doc,deleteDoc,  updateDoc  } from '../../Config/fireBaseConfig'
import { Spin } from 'antd';
import Swal from 'sweetalert2'

export default function Todo() {
  const [isPopupVisible, setPopupVisibility] = useState(false);
  let [loading, setLoading] = useState(false);
  let [getinput, setGetInput] = useState('')
  let [userId, setUserId] = useState('')
  let [data, setData] = useState([])
  let [ids,setIds]=useState([])
  let [editId,setEditId]=useState('')
  let[updateTodoInput,setUpdateTodoInput]=useState('')
  let[loader,setloader]=useState(true)
// ============== Get todos  ============== 
 
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const uid = user.uid;
          setUserId(uid);
          onSnapshot(query(collection(db, uid), orderBy("Time")), (snapshot) => {
            setData(snapshot.docs.map((doc) => doc));
            // setData(snapshot.docs.map((doc) => doc.data()));
            setIds(snapshot.docs.map((doc) => doc.id))
            setloader(false); // Set loading to false once data is fetched

          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserData()
      }
    });

  }, [])

  let getInput = (e) => {
      setGetInput(e.target.value)
  }
// ============== Add todos  ============== 

  let addTodo = () => {
    if (!getinput.trim()) {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Please fill input",
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }
    else{
      saveDataInFireBase(getinput)
    }
  }

  let saveDataInFireBase = async (e) => {
    try {
      const docRef = await addDoc(collection(db, userId), {
        Todo: e,
        Date: new Date().toDateString(),
        Time: new Date().toTimeString()
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  
  
// ============== Delete all todos  ============== 

  let deleteAll = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        }).then(async(result) => {
          if(result){
            try {
              setLoading(true); // Set loading to true before starting the deletion
                    for (let i = 0; i < ids.length; i++) {
                      await deleteDoc(doc(db, userId, ids[i]));
                      console.log(ids[i]);
                    }
            } catch (error) {
              console.error("Error deleting documents: ", error);
            } finally {
              setLoading(false); // Set loading to false once deletion is complete (whether success or failure)
            }
          }
        })
      }
    });    
  }

// ============== Delete  todos  ============== 
   let deleteTodo=async(id)=>{
    await deleteDoc(doc(db, userId, id));
   }
// ============== update  todos  ============== 
   
  let updateTodo=async(id)=>{
//     let a = prompt("enter value")

setPopupVisibility(true);
setEditId(id)
  }
 

  let updateTodos=(e)=>{
    setUpdateTodoInput(e.target.value)
  }
  const hidePopup = async() => {
    updateEditTodo()
 
};
  let updateEditTodo=async()=>{
    if (!updateTodoInput.trim()) {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Please fill input",
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }
    else{
      const washingtonRef = doc(db, userId, editId);
await updateDoc(washingtonRef, {
Todo: updateTodoInput,
     
});
setPopupVisibility(false);
    }
  }
  let closePopup=()=>{
setPopupVisibility(false);
  }
  

  return (
    <div className='todo'>
      <div className="input" >
        <div className="getInputs">
        <input className='form-control' placeholder='Enter value' type="text" onChange={getInput} />
        <button className='addTodo btn' onClick={addTodo}><i class="fas fa-plus"></i> <p>Add todo</p></button>
        <button className='deleteTodo btn' onClick={deleteAll}><i class="fas fa-trash-alt"></i><p>Delete All</p></button>
        </div>
      </div>
      <div className="show">
      {loader && (
          <div className="loader-container">
            <Spin />
            <p>Loading ...</p>
          </div>
        )}
       
      {loading &&
          <div className="loader-container">
             <Spin />
             <p>Loading ...</p>
          </div>
        }
        {
          data.map((data) =>(
        <div className="showTodos d-flex">
          <div className="para">
            <p>{data.data().Todo}</p>
            
          </div>
          <div className="buttns">
            <button id='edit' onClick={()=>{updateTodo(data.id)}} ><i className="fa-regular fa-pen-to-square"></i></button>
            <button id='delete' onClick={()=>{deleteTodo(data.id)}} ><i className="fa-solid fa-delete-left"></i></button>
          </div>
        </div>
          )
          )
        }
      </div>
       
      {isPopupVisible && (
        <div className="hiddenPopup">
        <div className="mainHiddenPopup">
          <h2>Update todo</h2>
          <div className="getinput">
            <input className='form-control' onChange={updateTodos} placeholder='Enter new value' type="text" />
          </div>
          <div className="buttons">
            <button onClick={hidePopup}><i className="fa-regular fa-pen-to-square"></i> Edit</button>
            <button onClick={closePopup}>Close</button>
          </div>

        </div>
        </div>
      )}

    </div>
  )
}
