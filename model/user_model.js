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
  password : {
    type: String,
    required : true
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
  todos:[
    {
      type: mongoose.Types.ObjectId,
      ref: "Todo"
    }
  ]
});

schema.methods = {
  findByName: function () {
    return mongoose.model("User").find();
  },
};

schema.statics = {
  findByName: function () {
    return mongoose.model("User").find();
  },
};

schema.query = {
  query: function (language) {
    return this.find({ name: new RegExp(language, "i") });
  },
};

const userModel = new mongoose.model("User", schema);

module.exports = userModel;
