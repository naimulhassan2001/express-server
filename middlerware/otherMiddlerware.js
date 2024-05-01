const logger = (req, res, next) => {
    console.log("Request Body:", req.body);
    console.log("URL:", `${req.protocol}://${req.hostname}${req.originalUrl}`);
  
    next();
  };

  module.exports = logger ;