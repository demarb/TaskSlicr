import React, { useState, useEffect } from 'react'
import { auth, googleProvider } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';

import LogoWhite from '../assets/logo-white.png'
import googleLoginButton from '../assets/google-icon.png'
import { useUserStore } from '../store'
import { useNavigate } from 'react-router-dom';
import CustomAlert from '../components/CustomAlert';


export default function Login() {
  //States
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

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
      console.error(error.code)
      const errorMessage = errorMessages[error.code] || 'An error occurred. Please try again later.';
      setError(errorMessage);
      setTimeout(() => {
        setError(null); // Clear the error message after 2 seconds
      }, 3000);
    }
  }

  const signIn = async () => {
    console.log("Normal Sign In")

    try {
          await signInWithEmailAndPassword(auth, email, password);

          loginSuccessful()
          // setSuccess(true)
          // setTimeout(()=>{
          //   setSuccess(false)
          // }, 3000)
          navigate("/app")
      
    } catch (error) {
      console.error(error.code)
      const errorMessage = errorMessages[error.code] || 'An error occurred. Please try again later.';
      setError(errorMessage);
      setTimeout(() => {
        setError(null); // Clear the error message after 2 seconds
      }, 3000);
    }
  }

  const signInWithGoogle = async () => {
    console.log("Sign In With Google")
    try {
          await signInWithPopup(auth, googleProvider);

          loginSuccessful()
          navigate("/app")
          
      
    } catch (error) {
      console.error(error.code)
      const errorMessage = errorMessages[error.code] || 'An error occurred. Please try again later.';
      setError(errorMessage);
      setTimeout(() => {
        setError(null); // Clear the error message after 2 seconds
      }, 3000);
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
    }, 500)
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

  //Mapping
  const errorMessages = {
    'auth/user-not-found': 'User does not exist',
    'auth/wrong-password': 'Incorrect email/password.',
    'auth/invalid-email': 'Invalid email entered',
    'auth/uid-already-exists': 'User already exists.',
    'auth/email-already-in-use': 'User already exists.',
    'auth/email-already-exists': 'User already exists.',
    'auth/internal-error': 'Server Error Occurred',
    'auth/too-many-requests': 'Too many requests. Try again later.',
    'auth/invalid-password': 'Password Invalid. String > 6 characters expected',
    'auth/weak-password' : 'Weak Password. Please choose a stronger password.',
    'auth/user-disabled': 'User account has been disabled.',
    'auth/credential-already-in-use': 'Credential is already in use.',
    'auth/invalid-credential': 'Invalid credential.',
    'auth/missing-email': 'Email address is required.',
    'auth/missing-password': 'Password is required.',
    'auth/popup-closed-by-user': 'Google Signin Popup closed by user.',
    'auth/account-exists-with-different-credential': 'Account with a different credential (Google) exists for this email.',
    'auth/cancelled-popup-request': 'The Google sign-in request was cancelled before it could complete.',
    'auth/operation-not-allowed': 'Operation not allowed',
    'auth/popup-blocked': 'Google Sign In popup blocked.',
  };

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
                {error && <CustomAlert message={error} type="error" />}
                {/* {success && <CustomAlert message="Login/Sign Up Successful. Redirecting..." type="success" />} */}
                {/* <a href=""><h3>Forgot Password?</h3></a> */}
            </div>
            
        </div>
    </section>


  )
}
