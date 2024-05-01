const express = require("express");
const upload = require("../middlerware/multer");

const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  res.json({
    Status: true,
    Message: `this is user route with get request ${req.originalUrl}`,
  });
});

userRouter.get("/:id", (req, res) => {
  res.json({
    Status: true,
    Message: `this is user route with get request ${req.originalUrl}`,
  });
});

userRouter.post("/", upload.single("image"), (req, res) => {
  console.log(req.file);
  console.log(req.body);
  res.send("this is home page with post request");
});

module.exports = userRouter;
