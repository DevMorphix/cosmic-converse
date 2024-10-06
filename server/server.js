const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");
app.use(cors());

const run = require("./helpers/gemini");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.json({ status: 200, message: "API working Properly" });
});

app.post("/generate", async (req, res) => {
  try {

    let content = req.body.gemini_content;
    let planetInfo = req.body.planet_info;
    let previousContent = req.body.previous_content;
    
    if (!content) {
      return res.status(400).json({ error: "gemini_content is required" });
    }
    const gemini = await run(content, planetInfo, previousContent);
    return res.json({
      message: "Gemini Reponse Retrived Successfully",
      data: gemini,
    });
  } catch (err) {
    console.error("Error :", err);
    res.status(500).json({
      status: 500,
      message: "Error ",
      error: err.message,
    });
  }
});

app.listen(port, () => {
  console.log(`\n--- Server listening on port ${port}`);
});
