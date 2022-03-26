const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
const MongoClient = require("mongodb").MongoClient;
let db;
MongoClient.connect(process.env.DB_URL, function (error, client) {
  //연결되면 할일
  if (error) {
    return console.log(error);
  }
  db = client.db("FirstTodo");

  server.listen(process.env.PORT, function () {
    console.log("8080");
  });
});

const server = require("http").createServer(app);
app.use(express.json());
app.use(cors()); // cors 미들웨어를 삽입합니다.
app.get("/", (req, res) => {
  // 요청패스에 대한 콜백함수를 넣어줍니다.
  res.send({ message: "hello" });
});
app.get("/about", (req, res) => {
  // 요청패스에 대한 콜백함수를 넣어줍니다.
  res.send({ message: "about입니다" });
});
app.post("/add", (req, res) => {
  //클라이언트에서 데이터 받아올려면 body parsers\
  console.log(req.body.todo);
  console.log(req.body.date);
  db.collection("counter").findOne(
    { name: "게시물갯수" },
    function (error, result) {
      let totalNumber = result.totalPost;

      db.collection("post").insertOne(
        { _id: totalNumber + 1, todo: req.body.todo, date: req.body.date },
        function (error, result) {
          console.log("저장완료");
          db.collection("counter").updateOne(
            { name: "게시물갯수" },
            { $inc: { totalPost: 1 } },
            function (error, result) {
              if (error) {
                return console.log(error);
              }
            }
          );
        }
      );
    }
  );

  res.send("전송완료!");
});
app.get("/list", (req, res) => {
  db.collection("post")
    .find()
    .toArray((req, data) => {
      res.send(data);
    });
});
