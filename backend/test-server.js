const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/test', (req, res) => {
    res.json({ message: 'Test route working!' });
});

app.listen(3001, () => {
    console.log('Test server running on port 3001');
}); 