const express = require("express");
const app = express();

app.use(express.json());

const logger = (req, res, next) => {
  console.log(req.url);
  next();
};

app.use(logger);
app.get("/user/:id", (req, res) => {
  console.log(req.params.id)
  res.send("this is home page with get request");
});

app.post("/", (req, res) => {
  console.log(req.body);
  res.send("this is home page with post request");
});

app.listen(3000, () => {
  console.log("server listening in 3000 port");
});
