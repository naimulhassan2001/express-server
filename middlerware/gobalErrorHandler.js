const errorHandler = (err, req, res, next) => {
  console.log("Global error handler middleware call");

  console.log(res.headersSent);

  if (res.headersSent) {
    next("There was a problem");
    
  } else {
    if (err.message) {
      console.log(err.message);
      res.status(500).json({
        Status: false,
        Message: err.message,
      });
    } else {
      res.status(500).json({
        Status: false,
        Message: "internal server error",
      });
    }
  }
};

module.exports = errorHandler;
