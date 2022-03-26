import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
const List = () => {
  let Navigate = useNavigate();
  let [list, setList] = useState([]);
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
  return (
    <div>
      {list.map((item, i) => {
        return (
          <div key={i}>
            <p>{item._id}</p>
            <p onClick={() => inDetail(item._id)}>{item.todo}</p>
            <p>{item.date}</p>
            <button id={item._id} onClick={del}>
              삭제하기
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default List;
