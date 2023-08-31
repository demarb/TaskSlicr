import React from 'react'
import LogoPurple from '../assets/logo-purple.png'
import PlusIconWhite from '../assets/plus-icon-white.png'
import ProfileIconWhite from '../assets/profile-white.png'
import ExitPurple from '../assets/exit-purple.png'

export default function Nav() {
  return (
    <nav className='bg-purple-900 flex justify-between items-center h-auto px-2 md:px-8 lg:px-12'>
        <img src={LogoPurple} className='w-48'/>
        <div className='flex flex-row justify-center items-center w-1/3'>
            <img src={PlusIconWhite} className='rounded-full border-white'/>
            <img src={ProfileIconWhite}/>
            <button className='rounded-md border-white border text-white w-2/5 py-1 my-2 max-md:hidden'>Sign Out</button>
        </div>
        
            <div className='bg-black bg-opacity-70 h-full fixed z-10 left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 lg:w-full border-black border border-solid rounded-lg'>
                {/* <h1>Add New Task</h1> */}

                <div className='bg-white h-3/4 fixed z-10 left-1/2 top-1/2 w-3/4 overflow-auto -translate-x-1/2 -translate-y-1/2 lg:w-1/2 border-gray-700 border border-solid rounded-lg p-4'>
                    <img src={ExitPurple} className='ml-auto'/>
                    <h1 className='text-2xl text-center'>Add New Task</h1>

                    <div className='flex flex-col'>
                        <input name='title' type="text" placeholder='Title...' />
                        <input name='description' type="text" placeholder='description...' />
                        
                        <div>
                            <label for="priority-selection ">Priority</label>
                            <select name="priority-selection" id="priority-selection" className='bg-purple-300 rounded-md'> Priority
                                <option value="">High</option>
                                <option value="">Medium</option>
                                <option value="">Low</option>
                            </select>
                        </div>

                        <div>
                            {/* <label htmlFor="status-selection ">Status
                                <input type='checkbox' className=''> </input>
                            </label> */}
                        </div>
                        
                        <input name='status' type="text" placeholder='status...' />
                        <input name='dueDate' type="datetime-local" placeholder='dueDate...'/>
                        <button className='rounded-md border-purple-900 border text-purple-900 w-2/5 py-1 my-2'>Add</button>
                    </div>
                </div>
                
            </div>

        

    </nav>
  )
}
