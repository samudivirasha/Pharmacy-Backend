// app.js
const express = require('express');
const mysql = require('mysql2');
const app = express();
const PORT = 3000;

app.use(express.json());

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
app.get('/inventorystatus', (req, res) => {
  const query = 'SELECT * FROM InventoryStatus';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send('Error retrieving inventory');
      console.log(err);
      return;
    }
    res.json(results);
  });
});


app.get('/MonthlySalesReport', (req, res) => {
  const query = 'SELECT * FROM MonthlySalesReport';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send('Error retrieving MonthlySalesReport');
      console.log(err);
      return;
    }
    res.json(results);
  });
});


app.get('/CustomerPurchaseHistory', (req, res) => {
  const query = 'SELECT * FROM CustomerPurchaseHistory';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send('Error retrieving purchase history');
      console.log(err);
      return;
    }
    res.json(results);
  });
});


app.get('/ProductSalesSummary', (req, res) => {
  const query = 'SELECT * FROM ProductSalesSummary';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send('Error retrieving ProductSalesSummary');
      console.log(err);
      return;
    }
    res.json(results);
  });
});


app.get('/showBill', (req, res) => {
  const query = 'SELECT * FROM showBill';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send('Error retrieving bill');
      console.log(err);
      return;
    }
    res.json(results);
  });
});



app.get('/SupplierDeliverSchedule', (req, res) => {
  const query = 'SELECT * FROM SupplierDeliverSchedule';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send('Error retrieving SupplierDeliverSchedule');
      console.log(err);
      return;
    }
    res.json(results);
  });
});



// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

