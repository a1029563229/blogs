const express = require('express');

const app = express();

app.get("/", (req, res) => {
  res.end("Hello Docker!")
});

app.listen(8000, () => {
  console.log("server is starting in http://localhost:8000");
});