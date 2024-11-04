// app.js
const express = require("express");
const mysql = require("mysql2");
const app = express();
const PORT = 3000;

app.use(express.json());

// MySQL Database Connection Pool
const pool = mysql.createPool({
  host: "193.203.166.160",
  user: "u392776179_adbms",
  password: "u392776179_ADBMS",
  database: "u392776179_adbms",
  waitForConnections: true,
  connectionLimit: 10, // Max number of connections in the pool
  queueLimit: 0, // No limit on queue size for pending connections
});

// Endpoint to get users
app.get("/inventorystatus", (req, res) => {
  const query = "SELECT * FROM InventoryStatus";
  pool.query(query, (err, results) => {
    if (err) {
      res.status(500).send("Error retrieving inventory");
      console.log(err);
      return;
    }
    res.json(results);
  });
});

app.get("/MonthlySalesReport", (req, res) => {
  const query = "SELECT * FROM MonthlySalesReport";
  pool.query(query, (err, results) => {
    if (err) {
      res.status(500).send("Error retrieving MonthlySalesReport");
      console.log(err);
      return;
    }
    res.json(results);
  });
});

app.get("/CustomerPurchaseHistory", (req, res) => {
  const query = "SELECT * FROM CustomerPurchaseHistory";
  pool.query(query, (err, results) => {
    if (err) {
      res.status(500).send("Error retrieving purchase history");
      console.log(err);
      return;
    }
    res.json(results);
  });
});

app.get("/ProductSalesSummary", (req, res) => {
  const query = "SELECT * FROM ProductSalesSummary";
  pool.query(query, (err, results) => {
    if (err) {
      res.status(500).send("Error retrieving ProductSalesSummary");
      console.log(err);
      return;
    }
    res.json(results);
  });
});

app.get("/showBill", (req, res) => {
  const query = "SELECT * FROM showBill";
  pool.query(query, (err, results) => {
    if (err) {
      res.status(500).send("Error retrieving bill");
      console.log(err);
      return;
    }
    res.json(results);
  });
});

app.get("/SupplierDeliverSchedule", (req, res) => {
  const query = "SELECT * FROM SupplierDeliverSchedule";
  pool.query(query, (err, results) => {
    if (err) {
      res.status(500).send("Error retrieving SupplierDeliverSchedule");
      console.log(err);
      return;
    }
    res.json(results);
  });
});

// Add customer endpoint
app.post("/addcustomer", (req, res) => {
  const { customer, mobileno } = req.body;
  const query = `CALL AddCustomer(?, ?);`;

  pool.query(query, [customer, mobileno], (err, results) => {
    if (err) {
      res.status(500).send("Error adding customer");
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
