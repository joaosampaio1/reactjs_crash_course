import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import { useState, useEffect } from 'react'
import Footer from './components/Footer'
import About from './components/About'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom' 

function App() {

  
  //const name = "ABC";
  const [showAddTask, setShowAddTask] = useState(false);

  const [tasks, setTasks] = useState([
    /*{
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
*/
]);

useEffect(()=> {
  const getTasks = async () => {
    const tasksFromServer = await fetchTasks();
    setTasks(tasksFromServer)
  }

  getTasks()
},[]);

const fetchTasks = async () => {
  const res = await fetch('http://localhost:5000/tasks');
  const data = await res.json();
  return data;
}

const fetchTask = async (id) => {
  const res = await fetch(`http://localhost:5000/tasks/${id}`);
  const data = await res.json();
  return data;
}

const deleteTask = async (id) => {
  await fetch(`http://localhost:5000/tasks/${id}`, {
    method: 'DELETE',
  })
  console.log('delete',id);
  setTasks(tasks.filter((task) => task.id !== id));
}

const deleteAllTask = () => {
 tasks.forEach(task => {
    deleteTask(task.id);
 });
  console.log('deleted all');
  setTasks([]);
}

const toggleReminder = async (id) => {
  console.log(id);
  const taskToToggle = await fetchTask(id)
  const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder}
  const res = await fetch(`http://localhost:5000/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(updTask)
  });

  const data = await res.json()
  setTasks(tasks.map((task)=> task.id === id ? { ...task, reminder:data.reminder} :task))
}

const addTask = async(task) => {
  
  const res = await fetch('http://localhost:5000/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  })

  const data = await res.json();

  setTasks([...tasks, data]);
  /* console.log(task);
  const id = Math.floor(Math.random() * 10000) +1;
  const newTask = { id, ...task};
  setTasks([...tasks, newTask]); */
}

  return (
    <Router>
      <div className="container">
        <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} deleteAll={deleteAllTask} title='Task Tracker'/>
        
        {/*
        <p>{name}</p>
        */}
        <Routes>
          <Route path='/' 
         element={
         <>
          {showAddTask && <AddTask onAdd={addTask}/> }
          {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/> : 'No Tasks to show'}  
          </>}
         />
          <Route path='/about' element={<About />}/>
        </Routes>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;
