import React, { useState } from "react";
import axios from "axios";
import "./about.css";
import { useNavigate } from "react-router-dom";

const About = () => {
  let navigate = useNavigate();
  const [Email, SetEmail] = useState("");
  const [Password, SetPassword] = useState("");

  const emailHandler = (e) => {
    e.preventDefault();
    SetEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    e.preventDefault();
    SetPassword(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // state에 저장한 값을 가져옵니다.

    let body = {
      todo: Email,
      date: Password,
    };

    axios
      .post("http://localhost:8080/add", body)
      .then((res) => console.log(res));

    navigate("/add");
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
          <label>할일</label>
          <input type="text" value={Email} onChange={emailHandler}></input>
          <label>날짜</label>
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

export default About;
