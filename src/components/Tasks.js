import React from 'react'
import Task from './Task'

const Tasks = (props) => {
    

/*const tasks = [
    {
        id:1,
        text: 'Doctor Appointment',
        day: '11 March',
        reminder: true,
    },
    {
        id:2,
        text: 'Meeting',
        day: '1 June',
        reminder: true,
    }
]*/

  return (
    <>
    {props.tasks.map((task, index) => (
        <Task key={index} task={task} onDelete={props.onDelete} onToggle={props.onToggle}/>
    ))}
    </>
  )
}

export default Tasks