const express = require("express");
const app = express();
app.get("/", (req, res) => {
  res.send("this is home page with get request");
});

app.post("/", (req, res) => {
  res.send("this is home page with post request");
});

app.listen(3000, () => {
  console.log("server listening in 3000 port");
});
