import React, { useEffect, useState } from "react";
import axios from "axios";
import "./about.css";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  let navigate = useNavigate();
  let [editData, setEditData] = useState([]);
  let params = useParams();
  const [Email, SetEmail] = useState("");
  const [Password, SetPassword] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8080/edit/" + params.id).then((result) => {
      setEditData(result.data);
    });
  }, []);
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
      .put("http://localhost:8080/edit/" + params.id, body)
      .then((result) => {
        alert("게시글을 수정완료했습니다!");
      });
    navigate("/list");
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
          <input type="text" onChange={emailHandler}></input>
          <label>날짜</label>
          <input type="text" onChange={passwordHandler}></input>
          <button type="submit">수정하기</button>
        </form>
      </div>
    </>
  );
};

export default Edit;
