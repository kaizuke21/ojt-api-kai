import React from "react";

const Home = ({ setIsAuthenticated }) => {
  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <div>
      <h2>Welcome to the Home Page!</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
