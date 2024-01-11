import React from "react";
import "./App.css";
import DashBoard from "./DashBoard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./SignUp";
import Home from "./Home";
import Cart from "./Cart";
import PageError from "./PageError";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login/" element={<Login />} />
          <Route path="/signup/" element={<Signup />} />
          <Route path="/dashboard/" element={<DashBoard />} />
          <Route path="/cart/" element={<Cart />} />
          <Route path="/error/" element={<PageError />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
