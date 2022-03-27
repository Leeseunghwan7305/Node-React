import "./App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import About from "./components/About";
import Home from "./components/Home";
import Add from "./components/Add";
import List from "./components/List";
import Detail from "./components/Detail";
import Edit from "./components/Edit";
import Login from "./components/Login";
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
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" />
      </Routes>
    </div>
  );
}

export default App;
