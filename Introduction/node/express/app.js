const express = require("express");
const path = require("path");
const axios = require("axios");

const app = express();

app.use('/static', express.static('static'));

app.get("/", (req, res) => {
  res.end("Hello Express");
});

app.get("/happy", (req, res) => {
  res.sendFile(path.join(__dirname, "./static/happy.html"))
})

app.get("/crazy", (req, res) => {
  res.sendFile(path.join(__dirname, "./static/crazy.html"))
})

app.get("/sexy", (req, res) => {
  res.sendFile(path.join(__dirname, "./static/sexy.html"))
})

app.get("/cool", (req, res) => {
  res.sendFile(path.join(__dirname, "./static/cool.html"))
})

app.get("/product/list", (req, res) => {
  const { data } = axios.post("http://dev-api.jt-gmall.com/mall", {
    query: `{ counterCategoryList (page: 1, pageSize: 10) { total page pageSize } }`
  })
})

app.listen(8888, () => {
  console.log("server is listening in http://localhost:8888")
})