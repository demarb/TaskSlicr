import React from 'react'
import { useNavigate } from 'react-router-dom'

import LogoPurple from '../assets/logo-purple.png'
import LogoWhite from '../assets/logo-white.png'
import taskScreenshot from '../assets/task_screenshot2.png'
import taskAlgorithm from '../assets/task_algorithm2.png'

export default function Home() {

    //react-router
    const navigate = useNavigate()
    
    function loginClick(){        
        navigate("app/login")
    }

    return (
        <section>
            <nav className='bg-purple-900 flex justify-between items-center h-auto px-2 md:px-8 lg:px-12'>
                <img alt='Purple logo' src={LogoPurple} className='w-48'/>
                <div className='flex flex-row justify-center items-center w-1/3'>
                    <button onClick={loginClick} className='rounded-md border-white border text-white hover:text-purple-900 hover:bg-white w-2/5 py-1 my-2'>Sign In</button>
                </div>
            </nav>
            <div className='leading-8'>
                <div className='p-4 md:px-12 lg:px-60'>
                    <img alt='White logo' src={LogoWhite} className='w-60 mx-auto'/>
                    <p>
                        Welcome to TaskSlicr, the versatile task management solution designed to adapt to your 
                        unique workflow. Unlike traditional task scheduling apps, TaskSlicr acknowledges that 
                        everyone works differently. We empower you to manage your tasks in a way that suits your 
                        preferences and requirements.
                    </p>
                    <img alt='App feature screenshot with tasks' src={taskScreenshot} className='mx-auto'/>
                </div>
                <div className='bg-purple-900 p-4 md:px-12 lg:px-60 text-white'>
                    <h1 className='text-2xl pb-2'>Our Mission</h1>
                    <p>
                    At TaskSlicr, our mission is to provide you with a customizable tool that simplifies task 
                    management. We recognize that individual productivity methods vary, so we've created TaskSlicr
                    to be your adaptable partner in achieving your goals efficiently.
                    </p>
                </div>
                <div className='p-4 md:px-12 lg:px-60'>
                    <h1 className='text-2xl pb-2'>Key Features</h1>
                    <ul>
                        <li>
                            <span className='font-bold'>Task Visualization: </span>
                            Tailor your task visualization based on factors that matter to you. Categorize tasks 
                            by length (short, medium, long), priority (low, medium, high), and status (completed). 
                            Customize your task view to reflect your workflow.
                        </li>
                        <li>
                            <span className='font-bold'>Scheduling Algorithms: </span>
                            Explore scheduling algorithms like First-Come, First-Served, among others, to optimize your 
                            task execution. TaskSlicr offers flexibility in how you manage your tasks.
                            <div className='mx-auto w-52 md:w-auto'>
                                <img alt='App feature screenshot with settings' src={taskAlgorithm} className='mx-auto max-w-full object-contain '/>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className='bg-purple-900 p-4 md:px-12 lg:px-60 text-white'>
                    <h1 className='text-2xl pb-2'>Get Started Today</h1>
                    <p>
                    TaskSlicr is accessible as a web platform. To begin enhancing your task management experience, click below. 
                    TaskSlicr is here to adapt to your unique work style, so you can focus on what truly matters to you.
                    </p>
                    <button onClick={loginClick} className='rounded-md border-white border text-white hover:text-purple-900 hover:bg-white w-2/5 py-1 my-2'>Sign In</button>

                </div>

            </div>
            

        </section>
  )
}
