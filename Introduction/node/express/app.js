const express = require("express");
const path = require("path");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors())
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
  const page = req.query.page || 1;
  const pageSize = req.query.pageSize || 10;
  axios.post("http://dev-api.jt-gmall.com/mall", {
    query: `
    { counterGoodsList (page: ${page}, pageSize: ${pageSize}) 
      { 
        total 
        page 
        pageSize 
        items {
          _id
          name
          price
        }
      } 
    }`
  }).then(({ data }) => {
    res.setHeader("Content-Type", "application/json")
    res.end(JSON.stringify(data))
  });
});

app.listen(8888, () => {
  console.log("server is listening in http://localhost:8888")
})