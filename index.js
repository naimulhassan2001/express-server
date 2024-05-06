const express = require("express");
const mongoose = require("mongoose");
const errorHandler = require("./middlerware/gobalErrorHandler");
const logger = require("./middlerware/logger");
const mainRouter = require("./router/mainRouter");
const notFoundRoute = require("./middlerware/notFoundRoute");
const app = express();

app.use(express.json());
mongoose
  .connect("mongodb://localhost:27017/Todos")
  .then(() => console.log("mongoose connect successfully"))
  .catch((e) => console.log(e));

app.use(logger);

app.use(mainRouter);

app.use(notFoundRoute);
app.use(errorHandler);

app.listen(3000, () => {
  console.log("server listening in 3000 port");
});
