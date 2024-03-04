import React, { useState } from "react";
import axios from "axios";
import qs from "qs";

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const data = qs.stringify({
        username: username,
        password: password,
      });

      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://localhost:5000/users/login",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: data,
      };

      const response = await axios.request(config);
      if (response?.data?.data === "Invalid username, email, or password") {
        setError("Invalid credentials"); // Display error message if login fails
      } else {
        if (response?.data?.error) {
          setError("Invalid credentials"); // Display error message if login fails
        } else {
          // console.log("$$response", response);
          setIsAuthenticated(true); // Set isAuthenticated to true
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Invalid credentials"); // Display error message if login fails
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
