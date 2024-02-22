import React from 'react';

function TaskList({ tasks, deleteTask, toggleTaskCompletion }) {

    return (
        <ul>
            {tasks.map(task => (
                <div className='task-container'>
                    <li key={task.id}>
                        <div className='checkbox'>
                            <input
                                id={task.id}
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => toggleTaskCompletion(task.id)}
                            />
                            <label className='checkmark' htmlFor={task.id}></label>
                        </div>

                        <span className='text-name' style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.name}</span>
                        <span className='due-date'>{task.dueDateTime}</span>

                        <button className='delete-button' onClick={() => deleteTask(task.id)}>Delete</button>
                        
                    </li>
                </div>
            ))}
        </ul>
    );
}

export default TaskList;