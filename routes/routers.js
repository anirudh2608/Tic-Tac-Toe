const express = require("express");
const path = require("path");

const router = express.Router();


router.use( express.static('./static/'));

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../static/Homepage.html"))
});


router.get("/Game", (req, res) => {
  res.sendFile(path.join(__dirname, "../static/Game.html"))
});

router.get("/Game-Name", (req, res) => {
  res.sendFile(path.join(__dirname, "../static/Game-Name.html"));
});


module.exports = router;
