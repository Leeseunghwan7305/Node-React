import React, { useRef, useState } from "react";
import axios from "axios";
import "./about.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  let navigate = useNavigate();
  let inputId = useRef(null);
  let inputPw = useRef(null);
  let [id, setId] = useState("");
  let [pw, setPw] = useState("");
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
        <form style={{ display: "flex", flexDirection: "Column" }}>
          <label>아이디</label>
          <input
            ref={inputId}
            type="text"
            onChange={(e) => {
              setId(e.target.value);
            }}
          ></input>
          <label>비밀번호</label>
          <input
            ref={inputPw}
            type="text"
            onChange={(e) => {
              setPw(e.target);
            }}
          ></input>
          <button
            type="submit"
            onSubmit={() => {
              axios.post("http://localhost:8080/login", {
                id: inputId.current.value,
                pw: inputPw.current.value,
              });
            }}
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
