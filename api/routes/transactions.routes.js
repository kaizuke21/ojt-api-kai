// Transactions Routes 

const express = require('express');
const router = express.Router();
const pool = require('../config/dbConfig'); // Import database configuration
module.exports = router; // Export the router


// Transactions - View All
router.get('/get', (req, res) => {

  pool.query("SELECT * FROM transactions", (err, results) => {
    if (err) {
      res.send(`Error Loading Data!`);
    }
    res.send(results);
  });

});


// Transactions - Insert Transaction 
router.post('/insert', (req, res) => {
  
  const { user_id, product_id, quantity } = req.body;

  // Check if all required fields are provided
  if (!user_id || !product_id || !quantity ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Call the stored procedure to insert transaction details
  const sql = 'CALL sp_transactions_insert(?, ?, ?)';
  const values = [user_id, product_id, quantity];

  pool.query(sql, values, (err, results) => {
      if (err) {
          console.error('Error inserting transaction:', err);
          return res.status(500).json({ message: 'Error inserting transaction' });
      }
      console.log('Transaction inserted successfully');
      res.status(201).json({ message: 'Transaction inserted successfully' });
  });
  
});
