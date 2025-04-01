import { useState } from 'react';

const CreateTaskForm = ({ onClose, onTaskCreated }) => {
    const [task, setTask] = useState('');
    const [date, setDate] = useState('');
    const [task_description, setTaskDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Here you'll eventually handle the form submission
        console.log({ task, date, task_description });
        onClose(); // Close the modal after submission
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