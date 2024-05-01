const multer = require("multer");
const path = require("path");

const UPLOAD_FOLDER = path.join(__dirname, "../uploads/");

const storage = multer.diskStorage({
  destination: (req, fill, callback) => {
    callback(null, UPLOAD_FOLDER);
  },
  filename: (req, fill, callback) => {
    const fillExt = path.extname(fill.originalname);
    const filename =
      fill.originalname
        .replace(fillExt, "")
        .toLowerCase()
        .split(" ")
        .join("-") +
      "-" +
      Date.now();

    callback(null, filename + fillExt);
  },
});

var upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10, // 1 Mb
  },

  fileFilter: (req, fill, callback) => {
    if (
      fill.mimetype == "image/png" ||
      fill.mimetype == "image/jpg" ||
      fill.mimetype == "image/jpeg"
    ) {
      callback(null, true);
    } else {
      callback(new Error("only .png, .jpg or .jpeg format allowed!"));
    }
  },
});

module.exports = upload;
