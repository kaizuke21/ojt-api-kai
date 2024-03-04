//Kai Delantes

// index.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

//Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
// Import Routes - Users
const Users = require("./routes/users.routes");
// Routes Usage
app.use("/users", Users);

// Import Routes - Products
const Products = require("./routes/products.routes");
// Routes Usage
app.use("/products", Products);

// Import Routes - Transactions
const Transactions = require("./routes/transactions.routes");
// Routes Usage
app.use("/transactions", Transactions);

// To check if the API is working
app.get("/", (req, res) => {
  res.send("Welcome Developer!");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    `Server is running on port ${PORT} | Test here: http://localhost:${PORT}`
  );
});
