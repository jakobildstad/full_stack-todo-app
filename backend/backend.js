const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/test', (req, res) => {
    console.log('Test route hit!');  // Debug log
    res.json({ message: 'Test route working!' });
});

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',  // Your MySQL password
    database: 'todo_app'
});

// Test database connection
db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database');
});

// GET route
app.get('/api/tasks', (req, res) => {
    console.log('Tasks GET route hit!');  // Debug log
    const query = 'SELECT * FROM tasks ORDER BY task_date ASC';
    
    db.query(query, (err, results) => {
        if (err) {
            console.error('Database error:', err);
            res.status(500).json({ error: 'Failed to fetch tasks' });
            return;
        }
        res.json(results || []);
    });
});

// POST route
app.post('/api/tasks', (req, res) => {
    console.log('Tasks POST route hit!');  // Debug log
    const { task, date, task_description } = req.body;
    const query = 'INSERT INTO tasks (task, task_date, task_description) VALUES (?, ?, ?)';
    
    db.query(query, [task, date, task_description], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            res.status(500).json({ error: 'Failed to create task' });
            return;
        }
        res.status(201).json({ message: 'Task created successfully', id: result.insertId });
    });
});

// DELETE route
app.delete('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    console.log(`tasks DELETE route hit for id ${id}!`);  // Debug log
    
    const query = 'DELETE FROM tasks WHERE id = ?';

    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Failed to delete task' });
        }
        // If result.affectedRows > 0, we know a row was deleted
        console.log(`Deleted ${result.affectedRows} row(s)`);
        res.json({ message: 'Task deleted successfully' });
    });
});

// Start server
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});