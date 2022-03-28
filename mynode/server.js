const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const { send } = require("process");
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
app.delete("/delete", (req, res) => {
  req.body._id = parseInt(req.body._id);
  console.log(req.body._id);
  db.collection("post").deleteOne(req.body, function (error, result) {
    console.log("삭제완료!");
    res.status(200).send({ message: "성공했습니다" });
  });
});
app.get("/detail/:id", function (req, res) {
  db.collection("post").findOne(
    { _id: parseInt(req.params.id) },
    function (error, result) {
      res.send(result);
    }
  );
});
app.get("/edit/:id", function (req, res) {
  db.collection("post").findOne(
    {
      _id: parseInt(req.params.id),
    },
    function (error, result) {
      console.log(result);
      res.send(result);
    }
  );
});
app.put("/edit/:id", function (req, res) {
  db.collection("post").updateOne(
    { _id: parseInt(req.params.id) },
    { $set: { todo: req.body.todo, date: req.body.date } },
    function (error, result) {}
  );
});

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");

app.use(
  session({ secret: "비밀코드", resave: true, saveUninitialized: false })
);
app.use(passport.initialize());
app.use(passport.session());

app.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/fail" }),
  (req, res) => {
    res.send("로그인성공");
  }
);

passport.use(
  new LocalStrategy(
    {
      usernameField: "id",
      passwordField: "pw",
      session: true,
      passReqToCallback: false,
    },
    function (입력한아이디, 입력한비번, done) {
      //console.log(입력한아이디, 입력한비번);
      db.collection("login").findOne(
        { id: 입력한아이디 },
        function (에러, 결과) {
          if (에러) return done(에러);

          if (!결과)
            return done(null, false, { message: "존재하지않는 아이디요" });
          if (입력한비번 == 결과.pw) {
            return done(null, 결과);
          } else {
            return done(null, false, { message: "비번틀렸어요" });
          }
        }
      );
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (아이디, done) {
  done(null, {});
});

app.post("/search", (req, res) => {
  console.log(req.body.todo);
  let search2 = [
    {
      $search: {
        index: "todoSearch",
        text: {
          query: req.body.data.todo,
          path: "todo", // 제목날짜 둘다 찾고 싶으면 ['제목', '날짜']
        },
      },
    },
  ];
  db.collection("post")
    .aggregate(search2)
    .toArray((req, data) => {
      console.log(data);
      res.send(data);
    });
});
