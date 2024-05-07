const express = require("express");
const userRouter = require("./userRoute");
const TodoRouter = require("./todo_route");

const mainRouter = express.Router();

mainRouter.use("/user", userRouter);
mainRouter.use("/todo", TodoRouter);

module.exports = mainRouter;
