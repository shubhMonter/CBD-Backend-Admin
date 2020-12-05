const express = require("express");
const router = express.Router();
const path = require("path");
const controller = require("../component/blog");
const multer = require("multer");
const Blog = require("../component/blog/blog.schema");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    console.log("body in file name", req.body);
    let filename = file.originalname.split(".")[0];
    let name = req.body.imagName;
    cb(
      null,
      "image" + Date.now() + ".png"
      // `${req.body.author}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

let upload = multer({
	storage: storage,
	fileFilter: function (req, file, callback) {
		var ext = path.extname(file.originalname);
		if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg" && ext !==".webp") {
			req.fileValidationError = "Forbidden extension";
			return callback(null, false, req.fileValidationError);
		}
		callback(null, true);
	},
	// limits: {
	// 	fileSize: 420 * 150 * 200,
	// },
});

router.post("/add", upload.any(), (req, res) => {
  // console.log(req.body.heading, req.body.tags);
  console.log(req.body.data);
  let tags = [];

  if (typeof req.body.tags === "string") {
    tags = req.body.tags.split(",");
  } else {
    tags = req.body.tags;
  }
  let blogData = {
    ...req.body,
    tags,

    author: req.body.author || "Editorial team",
  };
  if (req.files.length > 0) {
    console.log(req.files);
    blogData["image"] = req.files[0].path;
  } else {
    delete blogData.image;
  }
  let data = new Blog(blogData);
  data
    .save()
    .then((result) => {
      console.log("Done", result);
      res.status(200).json({
        status: true,
        message: "Successfully added blog",
        data: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        status: false,
        message: err,
      });
    });
});
router.post("/update", upload.any(), (req, res) => {
  console.log("I am in the body");
  console.log(req.body);
  console.log(req.body.heading, req.body.tags);
  let tags = [];

  if (typeof req.body.tags === "string") {
    tags = req.body.tags.split(",");
  } else {
    tags = req.body.tags;
  }
  let blogData = {
    ...req.body,
    tags,

    author: req.body.author || "Editorial team",
  };
  if (req.files.length > 0) {
    console.log(req.files);
    blogData["image"] = req.files[0].filename;
  } else {
    blogData.image = "";
  }
  console.log(blogData);
  Blog.findOneAndUpdate({ _id: req.body._id }, blogData, { new: true })
    .then((result) => {
      console.log("updated", result);
      res.status(200).json({
        status: true,
        message: "Successfully updated blog",
        data: result,
      });
    })
    .catch((err) => {
      console.log("err", err);
      res.status(500).json({
        status: false,
        message: err,
      });
    });
});

router.delete("/delete/:id", controller.Delete);
router.get("/get/:id", controller.get);
router.post("/get/tag", controller.getByType);
router.post("/getAll", controller.getAll);

module.exports = router;
