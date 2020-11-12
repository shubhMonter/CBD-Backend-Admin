const Banner = require("./banner.schema");

const add = (req, res) => {
  //   console.log(req.body);
  const data = new Banner(req.body);
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
  Banner.find()
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
  Banner.findOne({ bannerName: req.params.name })
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
  Banner.findOneAndUpdate({ _id: req.body._id }, req.body, {
    new: true,
  })
    .then((result) => {
      return res.status(200).json({
        status: true,
        message: "Updated data successfully",
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
  Banner.findByIdAndDelete({ _id: req.body._id })
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
