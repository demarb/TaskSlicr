import React, { useState } from 'react'
import {  auth } from "../config/firebase";
import { signOut } from 'firebase/auth';

import LogoPurple from '../assets/logo-purple.png'
import PlusIconWhite from '../assets/plus-icon-white.png'
import ProfileIconWhite from '../assets/profile-white.png'
import { useNavigate } from 'react-router-dom';
import {useTaskStore, useUserStore} from '../store';
import NewTask from './NewTask';

export default function Nav({getTaskList}) {

    //States
    const [showAddNewTask, setShowAddNewTask] = useState(false)

    //Zustand States
    const user = useUserStore(state=>state.user)
    const clearTaskList = useTaskStore(state=>state.clearTaskList)
    
    //Firebase functions
    const navigate = useNavigate()

    const logout = async () => {
        console.log("Logout triggered")
    
        try {
                
                await signOut(auth);
                clearTaskList()
                navigate("/")
          
        } catch (error) {
          console.error(error)
        }
    }

    

  return (
    <nav className='bg-purple-900 flex justify-between items-center h-auto px-2 md:px-8 lg:px-12'>
        <img onClick={()=>navigate("/app")} src={LogoPurple} alt='Navagite to Scheduler button' className='w-48 cursor-pointer'/>
        <div className='flex flex-row justify-center items-center w-1/3'>
            <img onClick={()=>setShowAddNewTask((prevState)=>!prevState)} alt='Add a new task butto5'  src={PlusIconWhite} className='rounded-full border-white cursor-pointer'/>
            
            
            {
            user.photoUrl ?

            <div>
                <img onClick={()=>navigate("/app/profile")} src={user.photoUrl} alt='Navigate to profile button' className='cursor-pointer w-1/2 py-2 pl-1'/>
            </div>

            :

            <img onClick={()=>navigate("/app/profile")} src={ProfileIconWhite} alt='Navigate to profile button' className='cursor-pointer'/>
            }
            <button onClick={logout} className='rounded-md border-white border text-white w-2/5 py-1 my-2 max-md:hidden hover:text-purple-900 hover:bg-white'>Sign Out</button>
        </div>
        
        {showAddNewTask ? <NewTask setShowAddNewTask={setShowAddNewTask} getTaskList={getTaskList}/> : <></>}
        
    </nav>
  )
}
