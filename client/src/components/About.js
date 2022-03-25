import React from "react";
import "./about.css";
const About = () => {
  return (
    <div>
      <div className="nav">
        <div>Todo App</div>
        <div>Home</div>
        <div>Write</div>
        <div>임시</div>
      </div>

      <form action="/add" method="post">
        <label>할일</label>
        <input type="text"></input>
        <label>Due date</label>
        <input type="text"></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default About;
