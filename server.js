const dotenv = require("dotenv");
dotenv.config();

const newsRoutes = require("./routes/newsRoutes");
const quizRoutes = require("./routes/quizRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const newsRoutes = require("./routes/newsRoutes");
const quizRoutes = require("./routes/quizRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const { spawn } = require("child_process");
const path = require("path");

dotenv.config();

connectDB();

const app = express();


// =====================================================
// MIDDLEWARE
// =====================================================

app.use(cors());
app.use(express.json());


// =====================================================
// EXISTING ROUTES
// =====================================================

app.use("/api/surveys", require("./routes/surveyRoutes"));
app.use("/api/feedback", feedbackRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/news", newsRoutes);


// =====================================================
// 🤖 FAKE NEWS ML DETECTION API
// =====================================================

app.post("/api/detect-news", (req, res) => {

  const { news } = req.body;


  // -----------------------------------------------------
  // CHECK NEWS INPUT
  // -----------------------------------------------------

  if (!news || !news.trim()) {

    return res.status(400).json({
      success: false,
      message: "Please enter some news text."
    });

  }


  // -----------------------------------------------------
  // DETECT LANGUAGE
  // -----------------------------------------------------

  // Telugu Unicode range: 0C00–0C7F
  const isTelugu = /[\u0C00-\u0C7F]/.test(news);

  const language = isTelugu ? "te" : "en";


  console.log(
    `🌐 Detected language: ${language === "te" ? "Telugu" : "English"}`
  );


  // -----------------------------------------------------
  // PYTHON FILE
  // -----------------------------------------------------

  const pythonFile = path.join(
    __dirname,
    "predict_api.py"
  );


  // -----------------------------------------------------
  // START PYTHON
  // -----------------------------------------------------

  const pythonProcess = spawn(

    path.join(
      __dirname,
      "ml_env",
      "Scripts",
      "python.exe"
    ),

    [pythonFile],

    {
      cwd: __dirname
    }

  );


  let output = "";
  let errorOutput = "";


  // -----------------------------------------------------
  // SEND NEWS + LANGUAGE TO PYTHON
  // -----------------------------------------------------

  pythonProcess.stdin.write(

    JSON.stringify({

      news: news,

      language: language

    })

  );

  pythonProcess.stdin.end();


  // -----------------------------------------------------
  // RECEIVE PYTHON OUTPUT
  // -----------------------------------------------------

  pythonProcess.stdout.on("data", (data) => {

    output += data.toString();

  });


  // -----------------------------------------------------
  // RECEIVE PYTHON ERRORS
  // -----------------------------------------------------

  pythonProcess.stderr.on("data", (data) => {

    errorOutput += data.toString();

  });


  // -----------------------------------------------------
  // PYTHON FINISHED
  // -----------------------------------------------------

  pythonProcess.on("close", (code) => {


    if (code !== 0) {

      console.error(
        "❌ Python Error:",
        errorOutput
      );


      return res.status(500).json({

        success: false,

        message:
          "ML model could not process the news."

      });

    }


    // ---------------------------------------------------
    // PARSE PYTHON RESPONSE
    // ---------------------------------------------------

    try {

      const result = JSON.parse(output);


      console.log(
        `🤖 Prediction: ${result.prediction}`
      );

      console.log(
        `🎯 Confidence: ${result.confidence}%`
      );


      return res.json(result);


    } catch (error) {


      console.error(
        "❌ Invalid Python response:",
        output
      );


      return res.status(500).json({

        success: false,

        message:
          "Invalid response from ML model."

      });

    }

  });

});


// =====================================================
// TEST ROUTE
// =====================================================

app.get("/", (req, res) => {

  res.send(
    "🚀 Fake News Detection Backend is Running..."
  );

});


// =====================================================
// PORT
// =====================================================

const PORT =
  process.env.PORT || 5000;


app.listen(PORT, () => {

  console.log(
    `✅ Server running on port ${PORT}`
  );

});
