const express = require("express");
const errorHandler = require("./middlerware/gobalErrorHandler");
const logger = require("./middlerware/logger");
const mainRouter = require("./router/mainRouter");
const notFoundRoute = require("./middlerware/notFoundRoute");
const app = express();

app.use(express.json());

app.use(logger);

app.use(mainRouter);

app.use(notFoundRoute);
app.use(errorHandler);

app.listen(3000, () => {
  console.log("server listening in 3000 port");
});
