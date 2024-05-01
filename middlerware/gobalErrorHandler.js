const errorHandler = (err, req, res, next) => {
  console.log("Global error handler middleware invoked");
  res.status(500).json({
    Status: false,
    Message: "internal server error",
  });
};

module.exports = errorHandler;
