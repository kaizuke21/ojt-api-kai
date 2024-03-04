import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import NotFound from "./NotFound";

const App = () => {
  const storedIsAuthenticated = localStorage.getItem("isAuthenticated");
  const [isAuthenticated, setIsAuthenticated] = useState(storedIsAuthenticated);

  useEffect(() => {
    // Store isAuthenticated state in localStorage whenever it changes
    localStorage.setItem("isAuthenticated", isAuthenticated);
  }, [isAuthenticated]);

  return (
    <Router>
      {!isAuthenticated ? (
        <Routes>
          <Route
            path="/login"
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/home" element={<Navigate to="/login" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      ) : (
        <Routes>
          <Route
            path="/home"
            element={<Home setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/login" element={<Navigate to="/home" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </Router>
  );
};

export default App;
