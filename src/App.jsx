import { useState, useEffect } from 'react'

import './App.css'
import Auth from './components/Auth.jsx'
import { database, auth } from './config/firebase';
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc, query, where } from 'firebase/firestore'

function App() {

  //firestore Refs
  const tasksCollectionRef = collection(database, "tasks")
  

  //States
  const [taskList, setTaskList] = useState([])

  const [newTaskTitle, setNewTaskTitle] = useState("")
  const [newTaskDescription, setNewTaskDescription] = useState("")
  const [newTaskPriority, setNewTaskPriority] = useState("")
  const [newTaskStatus, setNewTaskStatus] = useState("")
  const [newTaskDueDate, setNewTaskDueDate] = useState("")

  //Use effects
  // useEffect(() => {
  //   getTaskList()
  // }, [])
  

  //Functions

  //Read
  const getTaskList = async () =>{
    try {
      // Read the data

      const queryRef = query(
        tasksCollectionRef,
        where("userId", "==", auth.currentUser.uid)
      )

      const data = await getDocs(queryRef)

      //set data
      const filteredData = data.docs.map((doc)=>{
        return {
          ...doc.data(),
          id: doc.id,
        
        }
      })
      console.log(filteredData)


      setTaskList(filteredData)

    } catch (error) {
      console.error(error)
    }

  }

  //Create
  async function onSubmitNewTask(e){
    try {
      // console.log(e)
      
      e.preventDefault();
      // const formattedDueDate = new Date(newTaskDueDate);
      
      // console.log(auth.currentUser.uid)

      await addDoc(
        tasksCollectionRef, 
        {
          title: newTaskTitle,
          description: newTaskDescription,
          priority: newTaskPriority,
          status: newTaskStatus,
          dueDate: new Date(newTaskDueDate).toISOString(),
  
          userId: auth.currentUser ? auth.currentUser.uid : "",
          createdTimestamp: new Date().toISOString(),
          modifiedTimestamp: "",
          completedTimestamp: "",
        }
      )

      getTaskList()

    } catch (error) {
      console.error(error)
    }
  }

  //Delete
  const deleteTask = async (id) => {
    const taskDoc = doc(database, "tasks", id)
    
    await deleteDoc(taskDoc)
    getTaskList()
  }

  //Update
  const updateTask = async (id) => {
    const taskDoc = doc(database, "tasks", id)
    
    await updateDoc(taskDoc, 
        //updated fields
        {
          title: newTitleTestExample,
        }
      )
    getTaskList()
  }

  return (
    <>
      <h1>TimeSlicr</h1>

      <br /><hr /><br />

      <Auth getTaskList={getTaskList}/>

      <br /><hr /><br />

      <div>
        <input name='title' type="text" placeholder='Title...' value={newTaskTitle} onChange={(e)=>setNewTaskTitle(e.target.value)}/>
        <input name='description' type="text" placeholder='description...' value={newTaskDescription} onChange={(e)=>setNewTaskDescription(e.target.value)}/>
        <input name='priority' type="text" placeholder='priority...' value={newTaskPriority} onChange={(e)=>setNewTaskPriority(e.target.value)}/>
        <input name='status' type="text" placeholder='status...' value={newTaskStatus} onChange={(e)=>setNewTaskStatus(e.target.value)}/>
        <input name='dueDate' type="datetime-local" placeholder='dueDate...' value={newTaskDueDate} onChange={(e)=>setNewTaskDueDate(e.target.value)}/>
        <button onClick={(e)=>onSubmitNewTask(e)}>Submit Task</button>
        {/* Owner, creation, modification and completion date handled behind the scene */}


      </div>
      


      <br /><hr /><br />

      <div>

        {taskList?.map((task)=>{
          return (
            <div>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p>{task.userId}</p>
              <button onClick={()=>deleteTask(task.id)} >Delete Task</button>
            </div>
          )
        })}

      </div>

      <br /><hr /><br />
    </>
  )
}

export default App
