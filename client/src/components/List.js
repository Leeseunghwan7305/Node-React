import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import "./List.css";
const List = () => {
  let Navigate = useNavigate();
  let [list, setList] = useState([]);
  let [inputData, setInputData] = useState("");
  let [searchData, setSearchData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8080/list").then((result) => {
      setList(result.data);
    });
  }, [list]);
  function del(e) {
    axios
      .delete("http://localhost:8080/delete", { data: { _id: e.target.id } })
      .then((result) => {
        console.log("삭제성공!");
      });
  }
  function inDetail(id) {
    Navigate("/detail/" + id);
  }
  function change(id) {
    Navigate("/edit/" + id);
  }
  function inputChange(e) {
    setInputData(e.target.value);
  }
  function searchButton() {
    if (inputData == "") return;
    else {
      axios
        .post("http://localhost:8080/search", { data: { todo: inputData } })
        .then((result) => {
          console.log("검색성공!");
          console.log(result);
          setSearchData(result.data);
        });
      setInputData("");
    }
  }
  return (
    <div>
      <div className="search-box">
        <input onChange={(e) => inputChange(e)} className="search"></input>
        <button onClick={searchButton} className="search-button">
          검색
        </button>
      </div>
      {list.map((item, i) => {
        return (
          <div className="list" key={i}>
            <p>글번호:{i + 1}</p>
            <p onClick={() => inDetail(item._id)}>할일:{item.todo}</p>
            <p>날짜:{item.date}</p>
            <button id={item._id} onClick={del}>
              삭제하기
            </button>
            <button onClick={() => change(item._id)}>수정하기</button>
          </div>
        );
      })}
      <div>검색결과</div>
      {searchData &&
        searchData.map((item, i) => {
          return (
            <div className="list" key={i}>
              <p>글번호:{i + 1}</p>
              <p onClick={() => inDetail(item._id)}>할일:{item.todo}</p>
              <p>날짜:{item.date}</p>
              <button id={item._id} onClick={del}>
                삭제하기
              </button>
              <button onClick={() => change(item._id)}>수정하기</button>
            </div>
          );
        })}
    </div>
  );
};

export default List;
