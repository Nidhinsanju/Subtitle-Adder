import React from "react";
import "./App.css";
import AddSub from "./AddSub";
import DashBoard from "./DashBoard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./SignUp";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/addSub/" element={<AddSub />} />
          <Route path="/login/" element={<Login />} />
          <Route path="/signup/" element={<Signup />} />
          <Route path="/dashboard/" element={<DashBoard />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
