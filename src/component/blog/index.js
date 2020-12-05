const Blog = require("./blog.schema");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: (req, file, cb) => {
    console.log("body in file name", req.body);
    let filename = file.originalname.split(".")[0];
    let name = req.body.imageName;
    cb(
      null,
      "image" + Date.now() + ".png"
      // `${req.body.author}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
}).any();

const add = (req, res) => {
  upload(req, res, (err) => {
    console.log("Request ---", req.body);
    console.log("Request file ---", req.file); //Here you get file.
    /*Now do where ever you want to do*/

    console.log(typeof req.body.tags[0]);
    let tags = [];
    if (typeof req.body.tags[0] === "string") {
      console.log("string");
      tags = JSON.parse(req.body.tags);
    } else {
      tags = req.body.tags;
    }
    let blogData = {
      ...req.body,
      tags,
      author: req.body.author || "Editorial team",
      image: req.file.path,
    };
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
    if (!err) return res.send(200).end();
  });
};

const update = (req, res) => {
  console.log("update", req.body);
  Blog.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true })
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
};

const get = (req, res) => {
  // console.log(req.params.id);
  Blog.findById(req.params.id)
    .then((result) => {
      res.status(200).json({
        status: true,
        message: "Successfully fetched blog",
        data: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: false,
        message: err,
      });
    });
};

const Delete = (req, res) => {
  console.log(req.params.id);
  Blog.findOneAndDelete({ _id: req.params.id })
    .then((result) => {
      res.status(200).json({
        status: true,
        message: "Successfully deleted blog",
        data: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: false,
        message: err,
      });
    });
};

const getByType = (req, res) => {
  console.log("in get type");
  let pageNo = Number(req.body.pageNo) || 0;
  let size = Number(req.body.size) || 10;
  console.log(req.body.tag);
  let query = {};
  if (req.body.tag !== "All") {
    query.tags = { $regex: new RegExp(`^${req.body.tag}$`), $options: "i" };
  }
  Blog.find(query)
    .skip(pageNo * size)
    .limit(size)
    .then((result) => {
      res.status(200).json({
        status: true,
        message: "Successfully fetched blogs",
        data: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: false,
        message: err,
      });
    });
};

const getAll = (req, res) => {
  console.log("GetAll", req.body);
  let pageNo = Number(req.body.pageNo) || 0;
  let size = Number(req.body.size) || 10;

  Blog.find({ type: req.body.type })
    .skip(pageNo * size)
    .limit(size)
    .then((result) => {
      console.log(result.length);
      res.status(200).json({
        status: true,
        message: "Successfully fetched blogs",
        data: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: false,
        message: err,
      });
    });
};

module.exports = {
  add,
  get,
  update,
  Delete,
  getByType,
  getAll,
};
