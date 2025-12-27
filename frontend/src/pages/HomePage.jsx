// src/pages/HomePage.jsx
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

const HomePage = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div>
      <h1>Welcome, {user?.name || "User"}!</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default HomePage;
