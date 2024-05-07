const logger = (req, res, next) => {
  console.log("Body:", req.body);
  console.log("URL:", `${req.protocol}://${req.hostname}${req.originalUrl}`);
  console.log(process.env.JWT_SECRET); 


  next();
};

module.exports = logger;
