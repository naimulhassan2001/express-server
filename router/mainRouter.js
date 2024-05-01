const express = require("express");
const userRouter = require("./userRoute");

const mainRouter = express.Router();

mainRouter.use("/user", userRouter);

module.exports = mainRouter;
