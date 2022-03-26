import React, { useEffect, useState } from "react";
import axios from "axios";

const List = () => {
  let [list, setList] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8080/list").then((result) => {
      setList(result.data);
    });
  }, []);
  return (
    <div>
      {list.map((item, i) => {
        return (
          <div key={i}>
            <p>{item._id}</p>
            <p>{item.todo}</p>
            <p>{item.date}</p>
          </div>
        );
      })}
    </div>
  );
};

export default List;
