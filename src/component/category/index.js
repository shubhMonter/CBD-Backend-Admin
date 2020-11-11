const Category = require("./category.schema");

const add = (req, res) => {
  console.log(req.body.category);
  const data = new Category(req.body);
  data
    .save()
    .then((result) => {
      return res.status(200).json({
        status: true,
        message: "Added data successfully",
        data: result,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        status: false,
        message: err,
      });
    });
};

const get = (req, res) => {
  Category.find()
    .then((result) => {
      return res.status(200).json({
        status: true,
        message: "Added data successfully",
        data: result,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        status: false,
        message: err,
      });
    });
};

const getByName = (req, res) => {
  console.log(req.params.name);
  Category.findOne({ category: req.params.name })
    .then((result) => {
      return res.status(200).json({
        status: true,
        message: "Added data successfully",
        data: result,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        status: false,
        message: err,
      });
    });
};

const update = (req, res) => {
  Category.findOneAndUpdate({ _id: req.body._id }, req.body, {
    new: true,
  })
    .then((result) => {
      return res.status(200).json({
        status: true,
        message: "Updated data successfully",
        data: result,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        status: false,
        message: err,
      });
    });
};

const deletee = (req, res) => {
  Category.findByIdAndDelete({ _id: req.body._id })
    .then(() => {
      return res.status(200).json({
        status: true,
        message: "Deleted data successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        status: false,
        message: err,
      });
    });
};

module.exports = {
  add,
  update,
  get,
  deletee,
  getByName,
};
