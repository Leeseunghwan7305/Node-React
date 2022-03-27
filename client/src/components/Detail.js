import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Route,
  Switch,
  NavLink,
  useParams,
} from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";
import "./Detail.css";
const Detail = () => {
  let [detailData, setDetailData] = useState([]);
  let params = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8080/detail/" + params.id).then((result) => {
      setDetailData(result.data);
    });
  }, []);
  function back() {
    navigate(-1);
  }
  return (
    <div>
      <div className="list">
        <p>할일:{detailData.todo}</p>
        <p>날짜:{detailData.date}</p>
      </div>
      <button onClick={back}>뒤로가기</button>
    </div>
  );
};

export default Detail;
