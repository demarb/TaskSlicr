import React, { useState } from 'react';
import { auth, googleProvider } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';


function Auth(props) {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [currentUserLogged, setCurrentUserLogged] = useState({
    em: "",
    photo: ""
  })

  const signUp = async () => {
    console.log("Normal Sign Up")

    try {
          await createUserWithEmailAndPassword(auth, email, password);

          auth.currentUser ? 
            setCurrentUserLogged((prevState)=>{
              const newObj = {
                em: auth.currentUser.email,
                photo: auth.currentUser.photoURL,
              }
              return newObj;
            })
            : console.log("No user detected after regular signup")
      
    } catch (error) {
      console.error(error)
    }
  }

  const signIn = async () => {
    console.log("Normal Sign In")

    try {
          await signInWithEmailAndPassword(auth, email, password);

          auth.currentUser ? 
            setCurrentUserLogged((prevState)=>{
              const newObj = {
                em: auth.currentUser.email,
                photo: auth.currentUser.photoURL
              }
              return newObj;
            })
            : console.log("No user detected after regular sign in")

          props.getTaskList()
      
    } catch (error) {
      console.error(error)
    }
  }

  const signInWithGoogle = async () => {
    console.log("Sign In With Google")

    try {
          await signInWithPopup(auth, googleProvider);

          auth.currentUser ? 
            setCurrentUserLogged((prevState)=>{
              const newObj = {
                em: auth.currentUser.email,
                photo: auth.currentUser.photoURL
              }
              return newObj;
            })
            : console.log("No user detected after google signup")
      
    } catch (error) {
      console.error(error)
    }
  }

  const logout = async () => {
    console.log("Logout triggered")

    try {
          await signOut(auth);
      
    } catch (error) {
      console.error(error)
    }
  }


  return (
    <div>
        <input placeholder="email" onChange={e => setEmail(e.target.value)} />
        <input type='password' placeholder='password...' id="" onChange={e => setPassword(e.target.value)} />
        <img src={currentUserLogged.photo}/>
        <button onClick={signIn}>Sign in</button>
        <button onClick={signUp}>Sign up</button>

        <button onClick={signInWithGoogle}> Sign in With Google</button>

        <button onClick={logout}>Logout</button>
    </div>
  )  
}


export default Auth;