const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/transactions", (req, res) => {
  res.render("transactions");
});

module.exports = router;
