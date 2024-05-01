const express = require("express");
const errorHandler = require("./middlerware/gobalErrorHandler");
const logger = require("./middlerware/otherMiddlerware");
const mainRouter = require("./router/mainRouter");
const app = express();

app.use(express.json());

app.use(logger);
app.use(mainRouter);

app.use(errorHandler);

app.listen(3000, () => {
  console.log("server listening in 3000 port");
});
