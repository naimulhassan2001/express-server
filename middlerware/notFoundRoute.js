const notFoundRoute = (req, res, next) => {
  res.status(404).json({
    Status: false,
    Message: "Request url was not found",
  });
};

module.exports = notFoundRoute;
