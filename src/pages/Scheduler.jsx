import React, { useEffect } from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { useTaskStore } from '../store';

import { database, auth } from "../config/firebase";
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc, query, where } from 'firebase/firestore'
import Task from '../components/Task';


export default function Scheduler() {

  //firestore Refs
  const tasksCollectionRef = collection(database, "tasks")

  //Zustand states
  const setTaskList = useTaskStore((state)=>state.setTaskList)
  
  console.log("Renders")
  const taskList = useTaskStore((state) => state.taskList)
  console.log("Task list in state=>")
  console.log(taskList)
  
  // const taskList = useTaskStore((state) => state.taskList)
  // console.log("Task list in state=>")
  // console.log(taskList)

  //Read
  useEffect(()=>{
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
        console.log("What the actual fuck")
        // console.log(filteredData)
        setTaskList(filteredData)
  
      } catch (error) {
        console.error(error)
      }
  
    }
  
    getTaskList()

  }, [])
  

  return (
    <section className='min-h-screen flex flex-col'>
        
        <Nav />
        

        {/* Sample Mockup Sizes:
          1. 10 to 20 Minutes => w-1/4
          2. 30 to 40  Minutes => w-2/4
          3. 50+  Minutes => w-3/4 */}

        <section className='flex flex-wrap flex-auto mx-4 py-2 md:mx-12 md:py-4 lg:mx-24 lg:py-10'>

          {
            taskList.map((task)=>{
              return <Task key={task.id} task={task}/>
            })
          }

          <div className='bg-yellow-300 w-3/4 mx-2 h-20 rounded-lg p-1 my-2 overflow-hidden'>Do your homework please</div>

          <div className='bg-orange-300 w-1/4 mx-2 h-20 rounded-lg p-1 my-2 overflow-hidden'>Do your homework please</div>
          <div className='bg-red-300 w-2/4 mx-2 h-20 rounded-lg p-1 my-2 overflow-hidden'>Do your homework please</div>

          <div className='bg-green-300 w-2/4 mx-2 h-20 rounded-lg p-1 my-2 overflow-hidden'>Do your homework please</div>
          <div className='bg-yellow-300 w-1/4 mx-2 h-20 rounded-lg p-1 my-2 overflow-hidden'>Do your homework please</div>

          <div className='bg-green-300 w-1/4 mx-2 h-20 rounded-lg p-1 my-2 overflow-hidden'>Do your homework please</div>
          <div className='bg-yellow-300 w-1/4 mx-2 h-20 rounded-lg p-1 my-2 overflow-hidden'>Do your homework please</div>
          <div className='bg-red-300 w-1/4 mx-2 h-20 rounded-lg p-1 my-2 overflow-hidden'>Do your homework please</div>
        </section>

        <Footer/>

    </section>
  )
}
