import React, { useState } from "react";
import axios from "axios";
import "./about.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  let navigate = useNavigate();

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100vh",
        }}
      >
        <form
          action="/login"
          method="POST"
          style={{ display: "flex", flexDirection: "Column" }}
        >
          <label>아이디</label>
          <input name="id" type="text"></input>
          <label>비밀번호</label>
          <input name="pw" type="text"></input>
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
};

export default Login;
