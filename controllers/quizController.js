const QuizResult = require("../models/QuizResult");

// Save Quiz Result
const saveQuizResult = async (req, res) => {
  try {
    const quiz = await QuizResult.create(req.body);

    res.status(201).json({
      success: true,
      message: "Quiz Result Saved Successfully",
      data: quiz,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Quiz Results
const getQuizResults = async (req, res) => {
  try {
    const results = await QuizResult.find();

    res.status(200).json({
      success: true,
      count: results.length,
      data: results,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  saveQuizResult,
  getQuizResults,
};