import React, { useState } from 'react'
import { auth } from "../config/firebase";
import { signOut } from 'firebase/auth';

import LogoPurple from '../assets/logo-purple.png'
import PlusIconWhite from '../assets/plus-icon-white.png'
import ProfileIconWhite from '../assets/profile-white.png'
import ExitPurple from '../assets/exit-purple.png'
import { useNavigate } from 'react-router-dom';

export default function Nav() {

    //States
    const [showAddNewTask, setShowAddNewTask] = useState(false)

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

    //Firebase functions
    const navigate = useNavigate()

    const logout = async () => {
        console.log("Logout triggered")
    
        try {
                
                await signOut(auth);
                navigate("/")
          
        } catch (error) {
          console.error(error)
        }
      }

    //Renders
    const addTaskRender = 
            <div className='bg-black bg-opacity-70 h-full fixed z-10 left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 lg:w-full border-black border border-solid rounded-lg'>


            <div className='flex flex-col justify-around h-max bg-white fixed z-10 left-1/2 top-1/2 w-3/4 overflow-auto -translate-x-1/2 -translate-y-1/2 lg:w-1/2 border-gray-700 border border-solid rounded-lg p-4'>
                <img onClick={()=>setShowAddNewTask((prevState)=>!prevState)} src={ExitPurple} className='ml-auto cursor-pointer'/>
                <h1 className='text-2xl text-center'>Add New Task</h1>

                <div className='flex flex-col'>
                    <label className='font-bold'>
                            Title:
                            <input name='title' type="text" placeholder='Enter Task Title'  className='p-1 w-full font-normal'/>
                    </label>

                    <label className='font-bold'>
                            Description: 
                            <textarea name="description" id="description" cols="30" rows="5" placeholder='Enter Task Description' className='p-1 w-full font-normal'></textarea>
                    </label>
                                            
                    <label className='font-bold'>Priority:  
                        <select name="priority-selection" id="priority-selection" className='bg-purple-300 rounded-md p-1 ml-3 font-normal'>
                            <option value="">High</option>
                            <option value="">Medium</option>
                            <option value="">Low</option>
                        </select>
                    </label>

                    <label className='font-bold'> Duration:
                        <br />
                        <label className='italic font-normal'> Hours:
                            <select name="duration-selection" id="duration-selection" className='bg-purple-300 rounded-md p-1 w-1/5 ml-3 mr-3'>
                                {hourOptions}
                            </select>
                        </label>

                        
                        <label className='italic font-normal'> Minutes:
                            <select name="duration-selection" id="duration-selection" className='bg-purple-300 rounded-md p-1 w-1/5 ml-3'>
                                {minuteOptions}
                            </select>
                        </label>
                    </label>

                    <label className='font-bold'>
                        Status:<input type="checkbox" name="status-selection" defaultChecked={true} className='w-5 h-5 p-5 ml-3 mt-1 font-normal'/>
                    </label>

                    <label className='font-bold'> Due Date: 
                        <input name='dueDate' type="datetime-local" placeholder='dueDate...' className='p-1 font-normal'/>
                    </label>
                                    
                </div>

                <button className='rounded-md border-purple-900 border text-purple-900 w-2/5 py-1 my-2 hover:bg-purple-900 hover:text-white'>Add</button>

            </div>
        </div>




  return (
    <nav className='bg-purple-900 flex justify-between items-center h-auto px-2 md:px-8 lg:px-12'>
        <img onClick={()=>navigate("/app")} src={LogoPurple} className='w-48 cursor-pointer'/>
        <div className='flex flex-row justify-center items-center w-1/3'>
            <img onClick={()=>setShowAddNewTask((prevState)=>!prevState)}  src={PlusIconWhite} className='rounded-full border-white cursor-pointer'/>
            <img onClick={()=>navigate("/app/profile")} src={ProfileIconWhite} className='cursor-pointer'/>
            <button onClick={logout} className='rounded-md border-white border text-white w-2/5 py-1 my-2 max-md:hidden hover:text-purple-900 hover:bg-white'>Sign Out</button>
        </div>
        
        {showAddNewTask ? addTaskRender : <></>}
        
    </nav>
  )
}