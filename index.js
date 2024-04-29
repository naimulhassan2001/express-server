const express = require("express");
const app = express();

app.use(express.json());

app.locals.serverError = { Status: false, Message: "Internal server error" };
app.locals.clientError = { Status: false, Message: "Client side error" };

app
  .route("/admin/auth")
  .get((req, res) => {
    res.send("this is home page with get request");
  })
  .post((req, res) => {
    res.send("this is home page with post request");
  });

app.get("/user/:id", (req, res) => {
  res.send(app.locals.clientError);
});

app.post("/", (req, res) => {
  console.log(req.body);
  res.send("this is home page with post request");
});

app.listen(3000, () => {
  console.log("server listening in 3000 port");
});
