const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.json({ status: 200, message: "API working Properly" });
});

app.listen(port, () => {
  console.log(`\n--- Server listening on port ${port}`);
});
