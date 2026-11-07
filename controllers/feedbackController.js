const Feedback = require("../models/Feedback");

// Create Feedback
const createFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.create(req.body);

    res.status(201).json({
      success: true,
      message: "Feedback Submitted Successfully",
      data: feedback,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Feedback
const getFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find();

    res.status(200).json({
      success: true,
      count: feedback.length,
      data: feedback,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createFeedback,
  getFeedback,
};