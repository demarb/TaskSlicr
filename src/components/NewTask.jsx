import React, { useState } from 'react'
import {  database, auth } from "../config/firebase";
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc, query, where } from 'firebase/firestore'

import ExitPurple from '../assets/exit-purple.png'

export default function NewTask({setShowAddNewTask, getTaskList}) {
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
    const [newTaskTitle, setNewTaskTitle] = useState("")
    const [newTaskDescription, setNewTaskDescription] = useState("")
    const [newTaskPriority, setNewTaskPriority] = useState("High")
    
    const [newTaskDurationHours, setNewTaskDurationHours] = useState(0)
    const [newTaskDurationMinutes, setNewTaskDurationMinutes] = useState(0)
    const [newTaskStatus, setNewTaskStatus] = useState(false)
    const [newTaskDueDate, setNewTaskDueDate] = useState(new Date().toISOString().slice(0, 16))

    // console.log(newTaskPriority)
    // console.log(newTaskDurationHours)
    // console.log(newTaskDurationMinutes)

    //firestore Refs
    const tasksCollectionRef = collection(database, "tasks")

    //Firebase Functions
    //Create New Task
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
            duration: ((parseInt(newTaskDurationHours)*60) + parseInt(newTaskDurationMinutes)),
            status: newTaskStatus,
            // dueDate: new Date(newTaskDueDate),
            dueDate: new Date(newTaskDueDate).toISOString(),

            userId: auth.currentUser ? auth.currentUser.uid : "",
            createdTimestamp: new Date().toISOString(),
            modifiedTimestamp: new Date().toISOString(),
            completedTimestamp: "",
            }
        )

        getTaskList()
        setShowAddNewTask((prevState)=>!prevState)

        } catch (error) {
        console.error(error)
        }
    }


    return (
        <div className='bg-black bg-opacity-70 h-full fixed z-10 left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 lg:w-full border-black border border-solid rounded-lg'>
            <div className='flex flex-col justify-around h-max bg-white fixed z-10 left-1/2 top-1/2 w-3/4 overflow-auto -translate-x-1/2 -translate-y-1/2 lg:w-1/2 border-gray-700 border border-solid rounded-lg p-4'>
                <img onClick={()=>setShowAddNewTask((prevState)=>!prevState)} src={ExitPurple} className='ml-auto cursor-pointer'/>
                <h1 className='text-2xl text-center'>Add New Task</h1>

                <div className='flex flex-col'>
                    <label className='font-bold'>
                            Title:
                            <input name='title' type="text" placeholder='Enter Task Title' value={newTaskTitle} onChange={(e)=>setNewTaskTitle(e.target.value)} className='p-1 w-full font-normal'/>
                    </label>

                    <label className='font-bold'>
                            Description: 
                            <textarea name="description" id="description" cols="30" rows="5" placeholder='Enter Task Description' value={newTaskDescription} onChange={(e)=>setNewTaskDescription(e.target.value)} className='p-1 w-full font-normal'></textarea>
                    </label>
                                            
                    <label className='font-bold'>Priority:  
                        <select name="priority-selection" id="priority-selection" value={newTaskPriority} onChange={(e)=>setNewTaskPriority(e.target.value)} className='bg-purple-300 rounded-md p-1 ml-3 font-normal'>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                    </label>

                    <label className='font-bold'> Duration:
                        <br />
                        <label className='italic font-normal'> Hours:
                            <select name="duration-selection" id="duration-selection" value={newTaskDurationHours} onChange={(e)=>setNewTaskDurationHours(e.target.value)} className='bg-purple-300 rounded-md p-1 w-1/5 ml-3 mr-3'>
                                {hourOptions}
                            </select>
                        </label>

                        
                        <label className='italic font-normal'> Minutes:
                            <select name="duration-selection" id="duration-selection" value={newTaskDurationMinutes} onChange={(e)=>setNewTaskDurationMinutes(e.target.value)} className='bg-purple-300 rounded-md p-1 w-1/5 ml-3'>
                                {minuteOptions}
                            </select>
                        </label>
                    </label>

                    <label className='font-bold'>
                        Status:<input type="checkbox" name="status-selection" checked={newTaskStatus} onChange={(e)=>setNewTaskStatus(!newTaskStatus)} className='w-5 h-5 p-5 ml-3 mt-1 font-normal'/>
                    </label>

                    <label className='font-bold'> Due Date: 
                        <input name='dueDate' type="datetime-local" placeholder='dueDate...' value={newTaskDueDate} onChange={(e)=>setNewTaskDueDate(e.target.value)} className='p-1 font-normal'/>
                    </label>
                                    
                </div>

                <button onClick={(e)=>onSubmitNewTask(e)} className='rounded-md border-purple-900 border text-purple-900 w-2/5 py-1 my-2 hover:bg-purple-900 hover:text-white'>Add</button>

            </div>

        </div>
  )
}
