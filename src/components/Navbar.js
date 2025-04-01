import { useState } from 'react';
import CreateTaskForm from './CreateTaskForm';

const Navbar = () => {

    const [showForm, setShowForm] = useState(false);

    const handleClick = () => {
    setShowForm(true);
    };

    return ( 
        <nav className="navbar">
            <h1>The todo app</h1>
            <div className="links">
                
                <button 
                onClick={handleClick} 
                style={{
                    fontSize: "16px",          // increases text size
                    padding: "10px 20px",      // adds space inside the button
                    color: "white",
                    backgroundColor: "#f1356d",
                    borderRadius: "8px",
                    border: "none",            // optional: removes default border
                    cursor: "pointer"  
                }}>
                    Create
                </button>
            </div>

        {showForm && (
        <div className="modal">
          <CreateTaskForm
            // Optional: pass a callback to close the form after submit
            onClose={() => setShowForm(false)}
        />
        </div>
      )}
        </nav>
     );
}
 
export default Navbar;