import React, { useEffect } from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { useUserStore, useTaskStore } from '../store';

import { database, auth } from "../config/firebase";
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc, query, where, orderBy } from 'firebase/firestore'
import Task from '../components/Task';


export default function Scheduler() {

  //firestore Refs
  const tasksCollectionRef = collection(database, "tasks")

  //Zustand states
  const setTaskList = useTaskStore((state)=>state.setTaskList)
  // const task_algorithm = useUserStore(state=>state.task_algorithm)
  const setTaskAlgorithm = useUserStore(state=>state.setTaskAlgorithm)
  
  console.log("Renders")
  const taskList = useTaskStore((state) => state.taskList)
  console.log("Task list in state=>")
  console.log(taskList)

  const task_algorithm = useUserStore((state) => state.task_algorithm)
  console.log(task_algorithm)
  
  
  // const taskList = useTaskStore((state) => state.taskList)
  // console.log("Task list in state=>")
  // console.log(taskList)

  //Read
  const getTaskList = async () =>{
    try {
      // Read the data
      const queryRef = query(
        tasksCollectionRef,
        where("userId", "==", auth.currentUser.uid),
        orderBy("createdTimestamp", "desc")
      )
      const data = await getDocs(queryRef)
      console.log(data)

      //set data from docs received and add their id to the object
      const filteredData = data.docs.map((doc)=>{
        return {
          ...doc.data(),
          id: doc.id,
        
        }
      })

      //Sort data based on task setting
      const sortedData = sortTasks(task_algorithm, filteredData)

      //Set Sorted data
      // setTaskList(sortedData)
      setTaskList(filteredData)


      

    } catch (error) {
      console.error(error)
    }

  }

  //useEffects
  useEffect(()=>{
    getTaskList()
  }, [])

  //Function
  function sortTasks(task_algorithm, filteredData){
    //"FCFS, SJF, LJF, RS, PS, MPS"
    console.log(`Task Algorithm Selected: ${task_algorithm}`)
    // let filteredData1= [1, 2, 3]
    switch (task_algorithm) {
      case "FCFS":
        return filteredData.reverse()
        break;
      case "LIFO":
        return filteredData
        break;
      case "SJF":
        return filteredData.sort((taskA, taskB)=>taskA.duration - taskB.duration)
        break;
      case "LJF":
        return filteredData.sort((taskA, taskB)=>taskB.duration - taskA.duration)
        break;
      case "RS":
        // Knuth shuffle algorithm - swap last element with random index and decrease on next iteration
        for (let i = filteredData.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          // Swap array[i] and array[j]
          [filteredData[i], filteredData[j]] = [filteredData[j], filteredData[i]];
        }
        return filteredData
        break;
      case "PS":
        const priorityMap = {
          "Low": 1,
          "Medium": 2,
          "High": 3,
        };
        filteredData.sort((taskA, taskB) => priorityMap[taskA.priority] - priorityMap[taskB.priority]);

        return filteredData
        break;
      case "MPS":
        return filteredData
        break;
      
      default:
        break;
    }

  }

  
  

  return (
    <section className='min-h-screen flex flex-col'>
        
        <Nav getTaskList={getTaskList}/>
        
        <section className='flex flex-wrap items-center flex-auto mt-2 mx-4 md:mx-12 md:mt-4 lg:mx-24'>
          <label htmlFor="algorithm-setting" className='px-2 font-bold'>Current Task Algorithm: </label>
          {/* <select name="algorithm-setting" id="algorithm-setting" value={task_algorithm} onChange={e => setTaskAlgorithm(e.target.value)}  className='bg-purple-300 py-1 rounded-md md:mx-4'>
              <option value="FCFS">First-Come First-Served</option>
              <option value="LIFO">Last-In First-Out</option>
              <option value="SJF">Shortest Job First</option>
              <option value="LJF">Longest Job First</option>
              <option value="RS">Random Scheduling</option>
              <option value="PS">Priority Scheduling</option>
              <option value="MPS">Multilevel Priority Scheduling</option>
          </select> */}
          <h1 className='bg-purple-300 px-8 py-1 rounded-md md:mx-4'>{task_algorithm}</h1>
        </section>
        
        

        <section className='flex flex-wrap flex-auto mx-4 py-2 md:mx-12 md:py-4 lg:mx-24 lg:py-6'>

          {
            taskList.map((task)=>{
              return <Task key={task.id} task={task} getTaskList={getTaskList}/>
            })
          }

          {/* <div className='bg-yellow-300 w-3/4 mx-2 h-20 rounded-lg p-1 my-2 overflow-hidden'>Do your homework please</div>

          <div className='bg-orange-300 w-1/4 mx-2 h-20 rounded-lg p-1 my-2 overflow-hidden'>Do your homework please</div>
          <div className='bg-red-300 w-2/4 mx-2 h-20 rounded-lg p-1 my-2 overflow-hidden'>Do your homework please</div>

          <div className='bg-green-300 w-2/4 mx-2 h-20 rounded-lg p-1 my-2 overflow-hidden'>Do your homework please</div>
          <div className='bg-yellow-300 w-1/4 mx-2 h-20 rounded-lg p-1 my-2 overflow-hidden'>Do your homework please</div>

          <div className='bg-green-300 w-1/4 mx-2 h-20 rounded-lg p-1 my-2 overflow-hidden'>Do your homework please</div>
          <div className='bg-yellow-300 w-1/4 mx-2 h-20 rounded-lg p-1 my-2 overflow-hidden'>Do your homework please</div>
          <div className='bg-red-300 w-1/4 mx-2 h-20 rounded-lg p-1 my-2 overflow-hidden'>Do your homework please</div> */}
        </section>

        <Footer/>

    </section>
  )
}
