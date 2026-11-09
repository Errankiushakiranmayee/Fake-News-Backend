const express = require("express");

const router = express.Router();

const {
  createSurvey,
  getSurveys,
} = require("../controllers/surveyController");

router.post("/", createSurvey);

router.get("/", getSurveys);

module.exports = router;
