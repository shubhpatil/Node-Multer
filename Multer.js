const multer = require("multer");
const nanoid = require("nanoid");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Folder name where images to be uploaded
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    let extension = file.mimetype.split("/")[1];
    // Filename of uploaded image
    cb(null, file.fieldname + "-" + nanoid.nanoid() + `.${extension}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;
