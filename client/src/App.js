import "./App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import About from "./components/About";
import Home from "./components/Home";
import Add from "./components/Add";
import List from "./components/List";
function App() {
  const sendRequest = async () => {
    const response = await axios.get("http://localhost:8080/about");
    console.log(response);
    console.log(response.data);
  };

  useEffect(() => {
    sendRequest();
  });

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/add" element={<Add />} />
        <Route path="/list" element={<List />} />
      </Routes>
    </div>
  );
}

export default App;
