import { useState, useEffect } from 'react';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Tracks which tasks are "checked" locally
  // e.g. { 3: true, 5: false } means task with id=3 is “checked”
  const [checkedTasks, setCheckedTasks] = useState({});

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('http://localhost:3001/api/tasks');
        
        if (!response.ok) {
          if (response.status === 404) {
            setTasks([]);
            throw new Error('No tasks found');
          }
          if (response.status === 500) {
            throw new Error('Server error');
          }
          throw new Error('Failed to fetch tasks');
        }

        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Called when user clicks the "checkbox" button
  const handleCheckClick = (id) => {
    setCheckedTasks(prev => ({
      ...prev,
      [id]: !prev[id],  // toggle true/false for this task ID
    }));
  };

  // Called when user clicks "Press here to delete task"
  const handleDeleteTask = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/tasks/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete task');
      }

      // Remove the task from local state
      setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
      setError(error.message);
    }
  };

  return (
    <div className="home">
      <center><h1>Tasks</h1></center>
      <br />
      {loading && <div>Loading tasks...</div>}
      {error && <div className="error">Error: {error}</div>}
      {!loading && !error && (
        <div className="tasks-list">
          {tasks.length === 0 ? (
            <p>No tasks found. Create a new task!</p>
          ) : (
            tasks.map((task) => {
              const isChecked = checkedTasks[task.id] || false;
              return (
                <div key={task.id} className="task-card">
                  <h3>{task.task}</h3>
                  <p className="task-date">
                    Due: {new Date(task.task_date).toLocaleDateString()}
                  </p>
                  <p className="task-description">
                    Description: {task.task_description}
                  </p>

                  {/* "Check" button or icon */}
                  {!isChecked ? (
                    <button
                      className="check-button"
                      onClick={() => handleCheckClick(task.id)}
                    >
                      Check
                    </button>
                  ) : (
                    <div className="checked-container">
                      <span className="green-check">✔</span>
                      <p
                        className="delete-text"
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        Press here to delete task
                      </p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default Home;