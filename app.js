// app.js
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());

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
  const query = "SELECT * FROM ProductAvailability";
  pool.query(query, (err, results) => {
    if (err) {
      res.status(500).send("Error retrieving inventory");
      console.log(err);
      return;
    }
    res.json(results);
  });
});
app.get("/productiondetails", (req, res) => {
  const query = "SELECT * FROM ProductionDetails";
  pool.query(query, (err, results) => {
    if (err) {
      res.status(500).send("Error retrieving inventory");
      console.log(err);
      return;
    }
    res.json(results);
  });
});

app.get("/products", (req, res) => {
  const query = "SELECT * FROM Products";
  pool.query(query, (err, results) => {
    if (err) {
      res.status(500).send("Error retrieving inventory");
      console.log(err);
      return;
    }
    res.json(results);
  });
});
app.get("/lowstockalerts", (req, res) => {
  const query = "SELECT * FROM LowStockAlerts";
  pool.query(query, (err, results) => {
    if (err) {
      res.status(500).send("Error retrieving inventory");
      console.log(err);
      return;
    }
    res.json(results);
  });
});
app.get("/supplierdeliveryschedule", (req, res) => {
  const query = "SELECT * FROM SupplierDeliverySchedule";
  pool.query(query, (err, results) => {
    if (err) {
      res.status(500).send("Error retrieving inventory");
      console.log(err);
      return;
    }
    res.json(results);
  });
});

app.get("/monthlysalesreport", (req, res) => {
  const query = "SELECT * FROM MonthlySalesReport";
  pool.query(query, (err, results) => {
    if (err) {
      res.status(500).send("Error retrieving inventory");
      console.log(err);
      return;
    }
    res.json(results);
  });
});

app.get("/categories", (req, res) => {
  const query = "SELECT * FROM Categories";
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

app.post("/addcategory", (req, res) => {
  const { category_name } = req.body;
  const query = `CALL AddCategory(?);`;

  pool.query(query, [category_name], (err, results) => {
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

app.put("/edititem", (req, res) => {
  const { id, name, category, price, quantity } = req.body;
  const query = `CALL EditOrder(?, ?, ?, ?, ?);`;

  pool.query(query, [id, name, category, price, quantity], (err, results) => {
    if (err) {
      res.status(500).send("Error editing order");
      console.error(err);
      return;
    }
    res.json(results);
  });
});

app.post("/additem", (req, res) => {
  const { name, category, price, quantity } = req.body;
  const query = `CALL AddProduct(?, ?, ?, ?);`;

  pool.query(query, [name, category, price, quantity], (err, results) => {
    if (err) {
      res.status(500).send("Error editing order");
      console.error(err);
      return;
    }
    res.json(results);
  });
});

app.post("/addstock", (req, res) => {
  const { product, supplier, quantity } = req.body;
  const query = `CALL AddStock(?, ?, ?);`;

  pool.query(query, [product, supplier, quantity], (err, results) => {
    if (err) {
      res.status(500).send("Error editing order");
      console.error(err);
      return;
    }
    res.json(results);
  });
});

app.delete("/deleteproduct", (req, res) => {
  const { product_id } = req.body;
  const query = `CALL DeleteProduct(?);`;

  pool.query(query, [product_id], (err, results) => {
    if (err) {
      res.status(500).send("Error deleting product");
      console.error(err);
      return;
    }
    res.json({ message: "Product deleted successfully", results });
  });
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
