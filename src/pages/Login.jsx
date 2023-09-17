import React, { useState, useEffect } from 'react'
import { auth, googleProvider } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';

import LogoWhite from '../assets/logo-white.png'
import googleLoginButton from '../assets/google-icon.png'
import { useUserStore } from '../store'
import { useNavigate } from 'react-router-dom';


export default function Login() {
  //States
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  //Effects
  useEffect(()=>{
    isUserAlreadyLoggedIn()
  }, [])

  //Zustand States
  const setUser = useUserStore(state=>state.setUser)

  //Firebase functions
  const navigate = useNavigate()

  const signUp = async () => {
    console.log("Normal Sign Up")
    try {
          await createUserWithEmailAndPassword(auth, email, password);

          loginSuccessful()
          navigate("/app")
      
    } catch (error) {
      console.error(error)
    }
  }

  const signIn = async () => {
    console.log("Normal Sign In")

    try {
          await signInWithEmailAndPassword(auth, email, password);

          loginSuccessful()
          navigate("/app")
      
    } catch (error) {
      console.error(error)
    }
  }

  const signInWithGoogle = async () => {
    console.log("Sign In With Google")
    try {
          await signInWithPopup(auth, googleProvider);

          loginSuccessful()
          navigate("/app")
      
    } catch (error) {
      console.error(error)
    }
  }

  //Other Functions

  const isUserAlreadyLoggedIn = ()=>{
    //Check if user is logged in and redirect to home if necessary. - NOT DONE
    setTimeout(()=>{
      console.log(auth.currentUser)
      if (auth.currentUser !== null){
          console.log("Attempting navigating to home")
          navigate("/app")
      }else{
          console.log("Do nothing")
      }
    }, 1000)
  }
  
  const loginSuccessful = ()=>{
    const user = {
      loggedIn: true,
      email: auth.currentUser.email,
      photoUrl: auth.currentUser.photoURL,
    }
    console.log("Inside login Success")
    console.log(user)

    setUser(user)
  }

  return (
    <section className='bg-gray-200 h-screen flex flex-col'>
        <div className='bg-purple-900 h-screen flex flex-col justify-evenly px-16 rounded-lg md:px-24 lg:w-3/5 lg:h-2/3 lg:flex-row lg:mx-auto lg:my-auto lg:items-center'>

            <div className='flex flex-col justify-center lg:w-1/3'>
              <img src={LogoWhite} onClick={()=>navigate("/")} className='w-1/2 mx-auto lg:w-full py-8 cursor-pointer' />
              <h2 className='text-white text-lg max-lg:hidden'>Schedule your tasks the way that works best for you.</h2>
            </div>
            

            <div className='bg-white flex flex-col justify-around items-center py-20 h-2/3 md:h-3/5 rounded-lg lg:py-0 lg:h-4/5 lg:w-1/2'>
                <h1 className='text-xl py-2'>Login/Signup</h1>

                <input value={email} onChange={e => setEmail(e.target.value)} className='border-solid border-b-purple-900 border-b w-4/5' type="email" placeholder='Email...'/>
                <input value={password} onChange={e => setPassword(e.target.value)} className='border-solid border-b-purple-900 border-b w-4/5' type="password" name="" placeholder='Password...'/>
                <button onClick={signIn} className='bg-purple-900 rounded-md text-white border w-4/5 my-1 py-1 hover:text-purple-900 hover:bg-white hover:border-purple-900'>Login</button>
                <button onClick={signUp} className='bg-purple-900 rounded-md text-white border w-4/5 my-1 py-1 hover:text-purple-900 hover:bg-white hover:border-purple-900'>Sign Up</button>
                <button onClick={signInWithGoogle} className='hover:border hover:rounded-md hover:border-purple-900'><img src={googleLoginButton}/></button>
                <a href=""><h3>Forgot Password?</h3></a>
            </div>
            
        </div>
    </section>


  )
}
