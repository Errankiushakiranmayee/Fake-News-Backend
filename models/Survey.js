const mongoose = require("mongoose");

const surveySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    age: {
      type: Number,
      required: true,
    },

    village: {
      type: String,
      required: true,
      trim: true,
    },

    heardFakeNews: {
      type: String,
      required: true,
    },

    verifyBeforeSharing: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Survey", surveySchema);