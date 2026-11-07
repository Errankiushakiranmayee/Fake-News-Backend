const News = require("../models/News");

// Add News
const addNews = async (req, res) => {
  try {
    const news = await News.create(req.body);

    res.status(201).json({
      success: true,
      message: "News Added Successfully",
      data: news,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Verify News
const verifyNews = async (req, res) => {
  try {
    const { title } = req.body;

    const news = await News.findOne({
      title: { $regex: title, $options: "i" },
    });

    if (!news) {
      return res.json({
        success: false,
        message: "No matching news found. Please verify using trusted sources.",
      });
    }

    res.json({
      success: true,
      data: news,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addNews,
  verifyNews,
};