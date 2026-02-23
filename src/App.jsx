import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AlertProvider } from "./Components/CustomAlert";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";

const App = () => {
  return (
    <AlertProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </AlertProvider>
  );
};

export default App;
