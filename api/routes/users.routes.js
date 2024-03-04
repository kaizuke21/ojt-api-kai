// User Routes
 
const express = require('express');
const router = express.Router();
const pool = require('../config/dbConfig'); // Import database configuration
module.exports = router; // Export the router


// Users - View All
router.get('/get', (req, res) => {

  pool.query("SELECT * FROM users", (err, results) => {
    if (err) {
      res.send(`Error Loading Data!`);
    }
    res.send(results);
  });
  
});


// Users - Login (This asked either the username or the email_add and password of the user)
router.post("/login", (req, res) => {

  console.log(req.body);
  let userIdentifier = req.body.username || req.body.email;
  let loginType = req.body.username ? "username" : "email_add";
  console.log("Login Type:", loginType); 
  let userPassword = req.body.password;

  // Call the stored procedure to check login
  const sql = 'CALL sp_users_login(?, ?, ?)';
  pool.query(sql, [userIdentifier, loginType, userPassword], (err, results) => {
    if (err) {
      res.send({ error: true, msg: err });
      return;
    }
    let result = results[0][0].result;
    res.send({ error: false, data: result });
  });

});


//Users - Create or Insert User (New)
router.post("/insert", (req, res) => {

  const { first_name, last_name, username, contact_num, email_add, user_password } = req.body;

  // Check if all required fields are provided
  if (!first_name || !last_name || !username || !contact_num || !email_add || !user_password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Call the stored procedure to insert the user
  const sql = `CALL sp_users_insert(?, ?, ?, ?, ?, ?)`;
  const values = [first_name, last_name, username, contact_num, email_add, user_password];

  pool.query(sql, values, (err, results) => {

    if (err) {
      console.error("Error inserting user:", err);
      return res.status(400).json({ message: "User already exists" });

      // // Check if the error is due to duplicate entry
      // if (err.code === 'ER_DUP_ENTRY') {
      //   return res.status(400).json({ message: "User already exists" });
      // }
      
      // return res.status(500).json({ message: "Error inserting user" });
    }
    console.log("User inserted successfully");
    res.status(201).json({ message: "User inserted successfully" });
  });

});


// Users - Update Details
router.put('/update', (req, res) => {

  const { userId, first_name, last_name, username, contact_num, email_add } = req.body;

  // Call the stored procedure to update user details
  const sql = 'CALL sp_users_update(?, ?, ?, ?, ?, ?)';
  pool.query(sql, [userId, first_name, last_name, username, contact_num, email_add], (err, results) => {
      if (err) {
          console.error('Error updating user:', err);
          return res.status(500).json({ message: 'Error updating user' });
      }
      console.log('User details updated successfully');
      res.status(200).json({ message: 'User details updated successfully' });
  });
  
});


// Users - Delete
router.delete('/delete', (req, res) => {

  const userId = req.body.userId;

  // Check if userId is provided in the request body
  if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
  }

  // Call the stored procedure to delete user details
  const sql = 'CALL sp_users_delete(?)';
  pool.query(sql, [userId], (err, results) => {
      if (err) {
          console.error('Error deleting user:', err);
          return res.status(500).json({ message: 'Error deleting user' });
      }
      console.log('User deleted successfully');
      res.status(200).json({ message: 'User deleted successfully' });
  });

});


// Users - Search 
router.get('/search', (req, res) => {

  const searchTerm = req.body.searchTerm;

// Call the stored procedure to search for users
  const sql = 'CALL sp_users_search(?)';
  pool.query(sql, [searchTerm], (err, results) => {
      
       // Check if no results are found
       if (results[0].length === 0) {
        return res.status(404).json({ message: 'No user found' });
    }

      // Send the search results back to the client
      res.status(200).json(results[0]);
  });

});