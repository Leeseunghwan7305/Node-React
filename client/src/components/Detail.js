import axios from "axios";
import React, { useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Switch,
  NavLink,
  useParams,
} from "react-router-dom";
const Detail = () => {
  let params = useParams();

  useEffect(() => {
    axios.get("http://localhost:8080/detail/" + params.id).then((result) => {
      console.log(result.data);
    });
  }, []);
  console.log(params);
  return <div>안녕하세요 !!</div>;
};

export default Detail;
