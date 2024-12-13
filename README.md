
# Pharmacy Backend

This repository contains the backend service for a pharmacy management system. It is built using Node.js and Express.js, with a MySQL database integration.

## Features

- **Inventory Management:** Retrieve product availability, low stock alerts, and inventory details.
- **Order Management:** Add, edit, and manage customer orders.
- **Product Management:** Add, edit, and delete products in inventory.
- **Sales and Reports:** Generate monthly sales reports, customer purchase histories, and product sales summaries.
- **Supplier Management:** View supplier delivery schedules.
- **Category Management:** Add and manage product categories.

## Endpoints

### GET Endpoints

- `/inventorystatus` - Retrieve inventory status.
- `/productiondetails` - Fetch production details.
- `/products` - List all products.
- `/lowstockalerts` - Get alerts for low stock.
- `/supplierdeliveryschedule` - Fetch supplier delivery schedule.
- `/monthlysalesreport` - View monthly sales reports.
- `/categories` - Get product categories.
- `/CustomerPurchaseHistory` - Fetch customer purchase history.
- `/ProductSalesSummary` - Retrieve product sales summary.
- `/showBill` - Retrieve bill details.

### POST Endpoints

- `/addcustomer` - Add a new customer.
- `/addcategory` - Add a new category.
- `/addorder` - Add a new order with products and quantities.
- `/addproductstoinventory` - Add products to inventory.
- `/additem` - Add a new product.
- `/addstock` - Add stock for a product.

### PUT Endpoints

- `/edititem` - Edit product details.

### DELETE Endpoints

- `/deleteproduct` - Delete a product from inventory.

## Prerequisites

- Node.js (>= 14.x)
- MySQL database

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/samudivirasha/Pharmacy-Backend.git
   cd Pharmacy-Backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure the database connection in `app.js`:
   ```javascript
   const pool = mysql.createPool({
     host: "<your-database-host>",
     user: "<your-database-user>",
     password: "<your-database-password>",
     database: "<your-database-name>",
     waitForConnections: true,
     connectionLimit: 10,
     queueLimit: 0,
   });
   ```

4. Start the server:
   ```bash
   node app.js
   ```

5. Access the application at `http://localhost:3000`.

## Project Structure

- `app.js` - Main application file with all endpoints.
- `index.js` - Sample file to test the server setup.
- `package.json` - Project metadata and dependencies.
- `pnpm-lock.yaml` - Lockfile for `pnpm` package manager.
- `.gitignore` - Git ignored files.

## Database

The application uses a MySQL database with the following key tables:

- `ProductAvailability`
- `ProductionDetails`
- `Products`
- `LowStockAlerts`
- `SupplierDeliverySchedule`
- `MonthlySalesReport`
- `Categories`
- `CustomerPurchaseHistory`
- `ProductSalesSummary`
- `showBill`

Stored procedures used:

- `AddCustomer`
- `AddCategory`
- `AddOrder`
- `AddProductsToInventory`
- `AddProduct`
- `AddStock`
- `EditOrder`
- `DeleteProduct`

## Contributions

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## Contact

For issues or questions, please contact the repository owner or submit an issue.
