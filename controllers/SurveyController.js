const Survey = require("../models/Survey");

// Create Survey
const createSurvey = async (req, res) => {
  try {
    const survey = await Survey.create(req.body);

    res.status(201).json({
      success: true,
      message: "Survey Submitted Successfully",
      data: survey,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Surveys
const getSurveys = async (req, res) => {
  try {
    const surveys = await Survey.find();

    res.status(200).json({
      success: true,
      count: surveys.length,
      data: surveys,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createSurvey,
  getSurveys,
};