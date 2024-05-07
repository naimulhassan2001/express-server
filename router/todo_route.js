const express = require("express");
const upload = require("../middlerware/multer");
const TodoModel = require("../model/todo_model");
const UserModel = require("../model/user_model");
const { checkToken, create } = require("../middlerware/check_token");

const todoRouter = express.Router();

todoRouter.post("/", checkToken, async (req, res) => {
  try {
    const newTodo = new TodoModel({
      ...req.body,
      user: req.user._id,
    });

    const todo = await newTodo.save();
    await UserModel.updateOne(
      { _id: req.user._id },
      {
        $push: {
          todos: todo._id,
        },
      }
    );
    res.json(todo);
  } catch {
    console.log(err);
    res.status(500).json({
      Message: "internal server error",
    });
  }
});

todoRouter.get("/", checkToken, async (req, res) => {
  try {
    const todos = await TodoModel.find().populate('user','role name email date -_id');
    res.json(todos);
  } catch (err){
    console.log(err);
    res.status(500).json({
      Message: "internal server error",
    });
  }
});

module.exports = todoRouter;
