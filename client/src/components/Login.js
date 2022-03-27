import React, { useState } from "react";
import axios from "axios";
import "./about.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  let navigate = useNavigate();
  const [id, SetId] = useState("");
  const [Password, SetPassword] = useState("");

  const emailHandler = (e) => {
    e.preventDefault();
    SetId(e.target.value);
  };

  const passwordHandler = (e) => {
    e.preventDefault();
    SetPassword(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // state에 저장한 값을 가져옵니다.

    let body = {
      todo: id,
      date: Password,
    };

    axios
      .post("http://localhost:8080/login", body)
      .then((res) => {
        alert("로그인성공");
        navigate("/");
      })
      .catch((error) => {
        alert("로그인실패");
        navigate("/fail");
      });
  };

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
          onSubmit={submitHandler}
          style={{ display: "flex", flexDirection: "Column" }}
        >
          <label>아이디</label>
          <input type="text" value={id} onChange={emailHandler}></input>
          <label>비밀번호</label>
          <input
            type="text"
            value={Password}
            onChange={passwordHandler}
          ></input>
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
};

export default Login;
