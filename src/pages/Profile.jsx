import React from 'react'
import { useNavigate } from 'react-router-dom';
import { auth } from "../config/firebase";
import { signOut } from 'firebase/auth';


import Nav from '../components/Nav'
import Footer from '../components/Footer'
import ProfileIconBlack from '../assets/profile-black.png'
import {useUserStore} from '../store'

export default function Settings() {

  //Firebase functions
  const navigate = useNavigate()

  //Zustand States
  const user = useUserStore(state=>state.user)

  const logout = async () => {
    console.log("Logout triggered")

    try {
            await signOut(auth);
            navigate("/")
            
            
      
    } catch (error) {
      console.error(error)
    }
  }
    
  return (
    <section className='min-h-screen flex flex-col'>
        
        <Nav />

        <section className='flex-auto mx-4 py-2 md:mx-12 md:py-4 lg:mx-24 lg:py-10'>
            <section className='pb-6'>
                <h1 className='text-2xl py-4'>Profile</h1>
                <img src={user.photoUrl ? user.photoUrl : ProfileIconBlack} className='rounded-full border-black border-2 my-2'/>
                <h3 className='border-solid border-gray-200 border-b w-3/5 my-2 md:w-2/5'> {user.email ? user.email : Email} </h3>
                <button onClick={logout} className='bg-purple-900 border rounded-md text-white w-2/5 md:w-1/5 py-1 my-2 hover:text-purple-900 hover:bg-white hover:border-purple-900'>Sign Out</button>
            </section>

            <hr />

            <section className='pb-6'>
                <h1 className='text-2xl py-4'>Settings</h1>
                <label htmlFor="algorithm-setting">Change Task Algorithm</label>
                <select name="algorithm-setting" id="algorithm-setting" className='bg-purple-300 py-1 rounded-md md:mx-4'>
                        <option value="FCFS">First-Come First-Served</option>
                        <option value="SJF">Shortest Job First</option>
                        <option value="LJF">Longest Job First</option>
                        <option value="RS">Random Scheduling</option>
                        <option value="PS">Priority Scheduling</option>
                        <option value="MPS">Multilevel Priority Scheduling</option>
                </select>
                <br />
                <button className='bg-purple-900 border rounded-md text-white w-2/5 md:w-1/5 py-1 my-2 hover:text-purple-900 hover:bg-white hover:border-purple-900'>Save</button>
            </section>

        </section>

        <Footer/>

    </section>
  )
}
