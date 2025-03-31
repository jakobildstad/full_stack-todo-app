import { useState } from 'react';

const CreateTaskForm = ({ onClose }) => {
    const [task, setTask] = useState('');
    const [date, setDate] = useState('');
    const [task_description, setTaskDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // 1. Send a POST request to the backend
        fetch('http://localhost:4000/api/tasks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ task, date, task_description })
        })
          .then(response => response.json())
          .then(data => {
            // 2. Log or use the response
            console.log('Server response:', data);
            // You might show a success message, or update state in a parent component, etc.
    
            // 3. Close the modal if everything is good
            onClose();
          })
          .catch(error => {
            console.error('Error creating task:', error);
            // Handle any errors
          });
      };

    return (
        <div className="form-container">
            <button className="quit-button" onClick={onClose}>×</button>
            <form onSubmit={handleSubmit}>
                <h2>Create New Task</h2>
                
                <label>
                    Task:
                    <input 
                        type="text"
                        required
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                    />
                </label>

                <label>
                    Date:
                    <input 
                        type="date"
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </label>

                <label>
                    Task description:
                    <textarea
                        required
                        value={task_description}
                        onChange={(e) => setTaskDescription(e.target.value)}
                    ></textarea>
                </label>

                <div className="form-buttons">
                    <button type="button" onClick={onClose}>Cancel</button>
                    <button type="submit">Add Task</button>
                </div>
            </form>
        </div>
    );
}

export default CreateTaskForm; 