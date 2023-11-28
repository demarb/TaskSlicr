import React, { useEffect, useState, useRef } from 'react'
import ExitPurple from '../assets/exit-purple.png'
import DeleteIcon from '../assets/delete-purple.png'
import { database, auth } from '../config/firebase';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';

export default function ViewTask({ setShowTask, task, getTaskList }) {

  
  //Duration In Form
  const maxHours = 23;
  const maxMinutes = 59;

  const hourOptions = [];
  for (let i = 0; i <= maxHours; i++) {
      hourOptions.push(<option key={`hour-${i}`} value={i}>{i}</option>);
  }

  const minuteOptions = [];
  for (let i = 0; i <= maxMinutes; i++) {
      minuteOptions.push(<option key={`minute-${i}`} value={i}>{i}</option>);
  }

  //States
  const [taskTitle, setTaskTitle] = useState(task.title)
  const [taskDescription, setTaskDescription] = useState(task.description)
  const [taskPriority, setTaskPriority] = useState(task.priority)
  
  const [taskDurationHours, setTaskDurationHours] = useState(0)
  const [taskDurationMinutes, setTaskDurationMinutes] = useState(0)
  
  const [taskStatus, setTaskStatus] = useState(task.status)
  const [taskCompletedTimestamp, setTaskCompletedTimestamp] = useState(task.completedTimestamp)

    //Track previous status to set completedtimestamp
    const prevStatusRef = useRef();
    useEffect(() => {
      prevStatusRef.current = taskStatus;
    }, []);

  //Convert ISO string to format "YYYY-MM-DDTHH:MM"
  const formattedDueDate = task.dueDate.slice(0, 16);
  const [taskDueDate, setTaskDueDate] = useState(formattedDueDate)
  
  useEffect(()=>{
    const hours = Math.floor(task.duration / 60);
    const minutes = task.duration % 60;
    // Set the state variables
    setTaskDurationHours(hours);
    setTaskDurationMinutes(minutes);
  }, [])

  //Firebase functions
  //Update
  const updateTask = async (e) => {
    e.preventDefault();

    const taskDoc = doc(database, "tasks", task.id)
    
    await updateDoc(taskDoc, 
        //updated fields
        {
          title: taskTitle,
          description: taskDescription,
          priority: taskPriority,
          duration: ((parseInt(taskDurationHours)*60) + parseInt(taskDurationMinutes)),
          status: taskStatus,
          dueDate: new Date(taskDueDate).toISOString(),

          userId: auth.currentUser ? auth.currentUser.uid : "",
          modifiedTimestamp: new Date().toISOString(),
          completedTimestamp: checkStatusTimestamp(),
        }
      )
    getTaskList()
    setShowTask((prevState)=>!prevState)
  }

  //Delete
  const deleteTask = async (e) => {
    e.preventDefault();

    const taskDoc = doc(database, "tasks", task.id)
    
    await deleteDoc(taskDoc)
    getTaskList()
    setShowTask((prevState)=>!prevState)
  }


  //Other Functions
  const checkStatusTimestamp = ()=>{
    if (prevStatusRef.current===false && taskStatus===true){
      return new Date().toISOString()
    }else if(prevStatusRef.current===true && taskStatus===false) {
      return ""
    }else{
      return taskCompletedTimestamp
    }
  }

  return (
    <div className='bg-black bg-opacity-70 h-full fixed z-10 left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 lg:w-full border-black border border-solid rounded-lg'>
            <div className='flex flex-col justify-around h-max bg-white fixed z-10 left-1/2 top-1/2 w-3/4 overflow-auto -translate-x-1/2 -translate-y-1/2 lg:w-1/2 border-gray-700 border border-solid rounded-lg p-4'>
                <img onClick={()=>setShowTask((prevState)=>!prevState)} src={ExitPurple} className='ml-auto cursor-pointer'/>
                <h1 className='text-2xl text-center'>Task</h1>

                <div className='flex flex-col'>
                    <label className='font-bold'>
                            Title:
                            <input name='title' type="text" placeholder='Enter Task Title' value={taskTitle} onChange={(e)=>setTaskTitle(e.target.value)} className='p-1 w-full font-normal'/>
                    </label>

                    <label className='font-bold'>
                            Description: 
                            <textarea name="description" id="description" cols="30" rows="5" placeholder='Enter Task Description' value={taskDescription} onChange={(e)=>setTaskDescription(e.target.value)} className='p-1 w-full font-normal'></textarea>
                    </label>
                                            
                    <label className='font-bold'>Priority:  
                        <select name="priority-selection" id="priority-selection" value={taskPriority} onChange={(e)=>setTaskPriority(e.target.value)} className='bg-purple-300 rounded-md p-1 ml-3 font-normal'>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                    </label>

                    <label className='font-bold'> Duration:
                        <br />
                        <label className='italic font-normal'> Hours:
                            <select name="duration-selection" id="duration-selection" value={taskDurationHours} onChange={(e)=>setTaskDurationHours(e.target.value)} className='bg-purple-300 rounded-md p-1 w-1/5 ml-3 mr-3'>
                                {hourOptions}
                            </select>
                        </label>

                        
                        <label className='italic font-normal'> Minutes:
                            <select name="duration-selection" id="duration-selection" value={taskDurationMinutes} onChange={(e)=>setTaskDurationMinutes(e.target.value)} className='bg-purple-300 rounded-md p-1 w-1/5 ml-3'>
                                {minuteOptions}
                            </select>
                        </label>
                    </label>

                    <label className='font-bold'>
                        Status:<input type="checkbox" name="status-selection" checked={taskStatus} onChange={(e)=>setTaskStatus(!taskStatus)} className='w-5 h-5 p-5 ml-3 mt-1 font-normal'/>
                    </label>

                    <label className='font-bold'> Due Date: 
                        <input name='dueDate' type="datetime-local" placeholder='dueDate...' value={taskDueDate} onChange={(e)=>setTaskDueDate(e.target.value)} className='p-1 font-normal'/>
                    </label>
                                    
                </div>
                <div className='flex items-center justify-between'>
                  <button onClick={(e)=>updateTask(e)} className='rounded-md border-purple-900 border text-purple-900 w-2/5 py-1 my-2 hover:bg-purple-900 hover:text-white'>Update</button>
                  <img onClick={(e)=>deleteTask(e)} src={DeleteIcon} alt='Delete a task  button' className='cursor-pointer'/>
                </div>
                
            </div>

        </div>

  )
}
