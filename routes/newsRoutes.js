const express = require("express");

const router = express.Router();

const {
  addNews,
  verifyNews,
} = require("../controllers/newsController");

router.post("/add", addNews);

router.post("/verify", verifyNews);

module.exports = router;