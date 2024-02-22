import React, { useState,useEffect } from 'react';
import './App.css';
import TaskInput from './components/taskinput/TaskInput';
import TaskList from './components/tasklist/TaskList';

function App() {
  // Initialize tasks state with an empty array
  const [tasks, setTasks] = useState([]);
  
  useEffect(() => {
    scheduleNotifications();
  }, [tasks.length]);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  const addTask = (taskName, dueDateTime) => {
    const newTask = { id: Date.now(), name: taskName, completed: false, dueDateTime };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };


  const deleteTask = (taskId) => {
    // Filter out task with specified taskId
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const toggleTaskCompletion = (taskId) => {
    // Toggle completion status of task with specified taskId
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const scheduleNotifications = ()=>{
    tasks.forEach(task=>{
      if(!task.completed && task.dueDateTime){
        const now = new Date();
        const duedate = new Date(task.dueDateTime);
        const timeDifference = duedate.getTime()-now.getTime();
        if(timeDifference>0){
          setTimeout(()=>{
            sendNotification(task);
          },timeDifference);
        }
      }
    })
  };

  const sendNotification = (task)=>{
    if(!("Notification" in window)){
      console.log("This browser does not  support desktop notification");
    }else if(Notification.permission==="granted"){
      setTimeout(() => {
        new Notification(`Reminder: ${task.name}`, {
          body: "You have a pending task!",
        });
      }, 5000); 
    } else if (Notification.permission !== 'denied') {
      // Otherwise, request permission from the user
      Notification.requestPermission()
      .then(function (permission) {
        if (permission === "granted") {
          // If permission is granted, schedule the notification
          setTimeout(() => {
            new Notification(`Reminder: ${task.name}`, {
              body: "You have a pending task!",
            });
          }, 5000); // Delay for 5 seconds (adjust as needed)
        }
      });
    }
  };

  // Log tasks state to console
  console.log('tasks:', tasks);

  return (
    <div className="container">
      <h1>To-Do List</h1>
      <TaskInput addTask={addTask} />
      <TaskList tasks={tasks} deleteTask={deleteTask} toggleTaskCompletion={toggleTaskCompletion} />
    </div>
  );
}

export default App;
