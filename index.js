const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const errorHandler = require("./middlerware/gobalErrorHandler");
const logger = require("./middlerware/logger");
const mainRouter = require("./router/mainRouter");
const notFoundRoute = require("./middlerware/notFoundRoute");
const app = express();
dotenv.config();
console.log(process.env.JWT_SECRET);
app.use(express.json());
mongoose
  .connect(process.env.MONGODB_CONNECT_STRING)
  .then(() => console.log("mongoose connect successfully"))
  .catch((e) => console.log(e));

app.use(logger);

app.use(mainRouter);

app.use(notFoundRoute);
app.use(errorHandler);

app.listen(3000, () => {
  console.log("server listening in 3000 port");
});
