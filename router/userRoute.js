const express = require("express");
const upload = require("../middlerware/multer");
const userModel = require("../model/user_model");
const { checkToken, create } = require("../middlerware/check_token");

const userRouter = express.Router();

userRouter.get("/", checkToken, async (req, res) => {
  try {
    const users = await userModel.find().populate('todos');
    res.json({
      Status: true,
      data: users,
      Message: `this is user route with get request ${req.originalUrl}`,
    });
  } catch {
    res.status(500).json({
      Message: "internal server error",
    });
  }
});

userRouter.get("/instance", async (req, res) => {
  try {
    const user = new userModel();
    const users = await user.findByName();
    res.json({
      Status: true,
      Message: `this is user route with get request ${req.originalUrl}`,
      data: users,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      Message: "internal server error",
    });
  }
});

userRouter.get("/static", async (req, res) => {
  try {
    const users = await userModel.findByName();
    res.json({
      Status: true,
      Message: `this is user route with get request ${req.originalUrl}`,
      data: users,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      Message: "internal server error",
    });
  }
});

userRouter.get("/query", async (req, res) => {
  try {
    const users = await userModel.findByName().query("2");
    res.json({
      Status: true,
      Message: `this is user route with get request ${req.originalUrl}`,
      data: users,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      Message: "internal server error",
    });
  }
});

userRouter.get("/:id", async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.params.id });
    if (!user) {
      res.status(404).json({
        Status: false,
        Message: `User not found`,
        data: user,
      });
      return;
    }
    res.json({
      Status: true,
      Message: `this is user route with get request ${req.originalUrl}`,
      data: user,
    });
  } catch (e) {
    res.status(500).json({
      Message: `internal server error${e}`,
    });
  }
});

userRouter.post("/", async (req, res) => {
  try {
    const newUser = userModel(req.body);
    const user = await newUser.save();
    const token = await create(user);
    res.json(user);
  } catch {
    res.status(500).json({
      Message: "internal server error",
    });
  }
  // await newUser.save((err) => {
  //   if (!err) {
  //     res.json({
  //       Message: "user inserted successfully",
  //     });
  //   } else {
  //     res.status(500).json({
  //       Message: "internal server error",
  //     });
  //   }
  // });
});

userRouter.post("/signIn", async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });

    if (!user) {
      res.status(404).json({
        Message: "user not found",
      });

      return;
    }

    const accessToken = await create(user);

    user.accessToken = accessToken;

    res.json({
      Status: true,
      Message: "Sign in successfully!",
      data: {
        user: user,
        accessToken: user.accessToken,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      Message: "internal server error",
    });
  }
  // await newUser.save((err) => {
  //   if (!err) {
  //     res.json({
  //       Message: "user inserted successfully",
  //     });
  //   } else {
  //     res.status(500).json({
  //       Message: "internal server error",
  //     });
  //   }
  // });
});

userRouter.post("/all", async (req, res) => {
  const users = await userModel.insertMany(req.body);
  res.json(users);
});
userRouter.patch("/:id", async (req, res) => {
  const users = await userModel.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { name: req.body.name } },
    { new: true }
  );
  res.json(users);
});

userRouter.delete("/:id", async (req, res) => {
  try {
    await userModel.deleteOne({ _id: req.params.id });
    res.json({
      Status: true,
      Message: "User delete successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      Status: false,
      Message: "Internal server error",
    });
  }
});

// userRouter.post("/", upload.single("image"), (req, res) => {
//   console.log(req.file);
//   console.log(req.body);
//   res.send("this is home page with post request");
// });

module.exports = userRouter;
