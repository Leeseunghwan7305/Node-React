let router = require("express").router();

router.get("/sports", (req, res) => {
  res.sned("스포츠 게시판");
});

router.get("/game", (req, res) => {
  res.sned("게임 게시판");
});

module.exports = router;
