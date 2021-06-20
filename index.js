const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const upload = require("./Multer");
const app = express();

// CORS
app.use(cors());

// EXPRESS BODY-PARSER
app.use(express.json({}));
app.use(express.urlencoded({ extended: true }));

// STATIC FILES
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ROUTES
app.get("/", async (req, res) => {
  res.send("Hello Multer world");
});

// UPLOAD IMAGE ROUTE
app.post("/upload/image", upload.single("file"), async (req, res) => {
  let file = req.file;

  if (file) {
    // Delete Image
    fs.unlinkSync(__dirname + "/uploads/file-QW0glSYL8sz3iqsemZo-Y.jpeg");

    res.json({
      status: 200,
      message: "Image Uploaded !",
      file: file,
    });
  } else {
    res.json({
      status: 400,
      message: "Failed to Upload Image !",
    });
  }
});

// EXPRESS SERVER
app.listen(5000, async () => {
  console.log(`Server Running on Localhost : 5000`);
});
