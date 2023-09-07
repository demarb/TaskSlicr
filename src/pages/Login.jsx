import React, { useState } from 'react'
import { auth, googleProvider } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';

import LogoWhite from '../assets/logo-white.png'
import googleLoginButton from '../assets/google-icon.png'
import useUserStore from '../store'
import { useNavigate } from 'react-router-dom';


export default function Login() {
  //States
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  //Firebase functions
  const navigate = useNavigate()

  const signUp = async () => {
    console.log("Normal Sign Up")
    try {
          await createUserWithEmailAndPassword(auth, email, password);

          auth.currentUser ? 
            
              console.log(auth.currentUser)
            
            
            : console.log("No user detected after regular signup")

          navigate("/app")
      
    } catch (error) {
      console.error(error)
    }
  }

  const signIn = async () => {
    console.log("Normal Sign In")

    try {
          await signInWithEmailAndPassword(auth, email, password);

          // auth.currentUser ? 
          //   setCurrentUserLogged((prevState)=>{
          //     const newObj = {
          //       em: auth.currentUser.email,
          //       photo: auth.currentUser.photoURL
          //     }
          //     return newObj;
          //   })
          //   : console.log("No user detected after regular sign in")

          // props.getTaskList()

          auth.currentUser ? 
            
              console.log(auth.currentUser)
            
            
            : console.log("No user detected after regular signin")

          navigate("/app")
      
    } catch (error) {
      console.error(error)
    }
  }

  const signInWithGoogle = async () => {
    console.log("Sign In With Google")
    try {
          await signInWithPopup(auth, googleProvider);

          // auth.currentUser ? 
          //   setCurrentUserLogged((prevState)=>{
          //     const newObj = {
          //       em: auth.currentUser.email,
          //       photo: auth.currentUser.photoURL
          //     }
          //     return newObj;
          //   })
          //   : console.log("No user detected after google signup")

          auth.currentUser ? 
            
              console.log(auth.currentUser)
            
            
            : console.log("No user detected after google signin")

            navigate("/app")
      
    } catch (error) {
      console.error(error)
    }
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
