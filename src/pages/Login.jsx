import React from 'react'
import LogoWhite from '../assets/logo-white.png'
import googleLoginButton from '../assets/google-icon.png'


export default function Login() {

  return (
    <section className='bg-gray-200 h-screen flex flex-col'>
        <div className='bg-purple-900 h-screen flex flex-col justify-evenly px-16 rounded-lg md:px-24 lg:w-3/5 lg:h-2/3 lg:flex-row lg:mx-auto lg:my-auto lg:items-center'>

            <div className='flex flex-col justify-center lg:w-1/3'>
              <img src={LogoWhite} className='w-1/2 mx-auto lg:w-full  py-8' />
              <h2 className='text-white text-lg max-lg:hidden'>Schedule your tasks the way that works best for you.</h2>
            </div>
            

            <div className='bg-white flex flex-col justify-around items-center py-20 h-2/3 md:h-3/5 rounded-lg lg:py-0 lg:h-4/5 lg:w-1/2'>
                <h1 className='text-xl py-2'>Login/Signup</h1>

                <input className='border-solid border-b-purple-900 border-b w-4/5' type="email" placeholder='Email...'/>
                <input className='border-solid border-b-purple-900 border-b w-4/5' type="password" name="" placeholder='Password...'/>
                <button className='bg-purple-900 rounded-md text-white w-4/5 my-1 py-1'>Login</button>
                <button className='bg-purple-900 rounded-md text-white w-4/5 my-1 py-1'>Sign Up</button>
                <button><img src={googleLoginButton}/></button>
                <a href=""><h3>Forgot Password?</h3></a>
            </div>
            
        </div>
    </section>


  )
}
