const express = require("express");

const router = express.Router();

const {
  saveQuizResult,
  getQuizResults,
} = require("../controllers/quizController");

router.post("/", saveQuizResult);

router.get("/", getQuizResults);

module.exports = router;