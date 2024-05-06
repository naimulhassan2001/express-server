const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    eunm: ["User", "Admin"],
    required: true,
    default: "User",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const userModel = new mongoose.model("User", schema);

module.exports = userModel;
