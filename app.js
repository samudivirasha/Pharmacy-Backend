// app.js
const express = require('express');
const mysql = require('mysql2');
const app = express();
const PORT = 3000;

// MySQL Database Connection
const db = mysql.createConnection({
  host: '193.203.166.160',
  user: 'u392776179_adbms',  
  password: 'u392776179_ADBMS',  
  database: 'u392776179_adbms',  

});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Endpoint to get users
app.get('/users', (req, res) => {
  const query = 'SELECT * FROM users'; // Assuming there is a 'users' table
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send('Error retrieving users');
      return;
    }
    res.json(results);
  });
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
