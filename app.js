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

app.get("/SupplierDeliverySchedule", (req, res) => {
  const query = "SELECT * FROM SupplierDeliverySchedule";
  pool.query(query, (err, results) => {
    if (err) {
      res.status(500).send("Error retrieving SupplierDeliverySchedule");
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

app.post("/addorder", (req, res) => {
  const { uid, order } = req.body;

  // Extract product IDs and quantities from the order array
  const productIDs = order.map((item) => item[0]).join(",");
  const quantities = order.map((item) => item[1]).join(",");

  // Construct the SQL query
  const query = `SELECT AddOrder(${uid}, '${productIDs}', '${quantities}')`;

  // Execute the query
  pool.query(query, (err, results) => {
    if (err) {
      res.status(500).send("Error processing order");
      console.error(err);
      return;
    }
    res.json(results);
  });
});

app.post("/addproductstoinventory", (req, res) => {
  const { productIds, quantities } = req.body;
  const query = `SELECT AddProductsToInventory(?, ?);`;

  pool.query(query, [productIds, quantities], (err, results) => {
    if (err) {
      res.status(500).send("Error adding products to inventory");
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
