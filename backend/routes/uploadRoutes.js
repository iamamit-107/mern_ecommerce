const path = require("path");
const express = require("express");
const multer = require("multer");
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const checkFilter = (file, cb) => {
  const fileTypes = /jpg|jpeg|png/;
  const extname = fileTypes.test(
    path.extname(file.originalname).toLocaleLowerCase()
  );
  const mimeType = fileTypes.test(file.mimeType);

  if (extname && mimeType) {
    cb(null, true);
  } else {
    cb("Images Only");
  }
};

// upload middleware
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFilter(file, cb);
  },
});

router.post("/", upload.single("Image"), (req, res) => {
  res.send(`/${req.file.path}`);
});

module.exports = router;
