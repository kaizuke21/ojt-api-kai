// Products Routes 

const express = require('express');
const router = express.Router();
const pool = require('../config/dbConfig'); // Import database configuration
module.exports = router; // Export the router


// Products - View All
router.get('/get', (req, res) => {

  pool.query("SELECT * FROM products", (err, results) => {
    if (err) {
      res.send(`Error Loading Data!`);
    }
    res.send(results);
  });

});


// Products - Create or Insert Product 
router.post("/insert", (req, res) => {
  const { product_name, price, description, expiration_date, stocks } =
    req.body;

  // Check if all required fields are provided
  if (!product_name || !price || !description ) {
    return res.status(400).json({ message: "Input Required Fields" });
  }

  // Call the stored procedure to insert product details
  const sql = "CALL sp_products_insert(?, ?, ?, ?, ?)";
  pool.query(
    sql,
    [product_name, price, description, expiration_date, stocks],
    (err, results) => {
      if (err) {
        console.error("Error inserting product:", err);
        return res.status(500).json({ message: "Product already exist", err });
      }
      console.log("Product inserted successfully"); console.log("Product inserted successfully");
      res.status(200).json({ message: "Product inserted successfully" });
    }
  );
});


// Products - Update Details 
router.put('/update', (req, res) => {
  
  const { productId, product_name, price, description, status, expiration_date, stocks } = req.body;

  // Call the stored procedure to update product details
  const sql = 'CALL sp_products_update(?, ?, ?, ?, ?, ?, ?)';
  pool.query(sql, [productId, product_name, price, description, status, expiration_date, stocks], (err, results) => {
    
    if (err) {
      console.error('Error updating product:', err);
      return res.status(500).json({ message: 'Error updating product' });
    }
      console.log('Product updated successfully');
      res.status(200).json({ message: 'Product updated successfully' });
  });
});



// Products - Delete
router.delete('/delete', (req, res) => {

  const productId = req.body.productId;

  // Check if productId is provided in the request body
  if (!productId) {
      return res.status(400).json({ message: 'Product ID is required' });
  }

  // Call the stored procedure to delete product
  const sql = 'CALL sp_products_delete(?)';
  pool.query(sql, [productId], (err, results) => {
      if (err) {
          console.error('Error deleting product:', err);
          return res.status(500).json({ message: 'Error deleting product' });
      }
      console.log('Product deleted successfully');
      res.status(200).json({ message: 'Product deleted successfully' });
  });
  
});


// Products - Search 
router.get('/search', (req, res) => {

  const searchProduct = req.body.searchProduct;

  // Call the stored procedure to search for products
  const sql = 'CALL sp_products_search(?)';
  pool.query(sql, [searchProduct], (err, results) => {
     
    // Check if no results are found
      if (results[0].length === 0) {
        return res.status(404).json({ message: 'No product found' });
    }
      
      // Send the search results back to the client
      res.status(200).json(results[0]);
  });

});
