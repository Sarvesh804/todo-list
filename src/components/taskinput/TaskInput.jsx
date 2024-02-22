import React, { useState } from 'react'

const TaskInput = ({ addTask }) => {
  const [taskName, setTaskName] = useState('');
  const [dueDateTime, setDueDateTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskName.trim()) return;
    addTask(taskName, dueDateTime); // Pass dueDateTime to the addTask function
    setTaskName('');
    setDueDateTime('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter task"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <input type="datetime-local" // Use datetime-local input type for date and time
        value={dueDateTime}
        onChange={(e) => setDueDateTime(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskInput;