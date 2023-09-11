import React from 'react'

export default function Task({task}) {

    const setTaskColor = ()=>{
    
        if (task.status==true){
            return "#86efac"
        }else if (task.priority=="Low"){
            return "#fde047"
        }else if (task.priority=="Medium"){
            return "#fdba74"
        }else if (task.priority=="High"){
            return "#fca5a5"
        }else{
            console.log("Priority not accounted for")
            return "#d1d5db"
        }
        
    }

    const setTaskWidth = ()=>{
    
        if (task.duration<=15){
            return "25%"
        }else if (task.duration<=120){
            return "50%"
        }else if (task.duration>120){
            return "75%"
        }
        
    }



    // setTaskColor()
    // setTaskWidth()

    const taskStyles = {
        width: setTaskWidth(), // Set the width based on task length
        backgroundColor: setTaskColor(), // Set the background color based on priority
      };

    return (
        <div style={taskStyles} className='bg-yellow-300 w-3/4 mx-2 h-20 rounded-lg p-1 my-2 overflow-hidden'>
            {task.title}
        </div>
    )
}
