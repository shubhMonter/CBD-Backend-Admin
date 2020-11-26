const Home = require("./home.schema");

const add = (req, res) => {
  console.log(req.body);
  let {
    banner,
    categorySlider,
    thirdSection,
    bundlesSlider,
    fifthSection,
  } = req.body;
  if (typeof banner === "string") {
    banner = JSON.parse(banner);
    categorySlider = JSON.parse(categorySlider);
    thirdSection = JSON.parse(thirdSection);
    bundlesSlider = JSON.parse(bundlesSlider);
    fifthSection = JSON.parse(fifthSection);
  }

  const data = new Home({
    banner,
    categorySlider,
    thirdSection,
    bundlesSlider,
    fifthSection,
  });
  data
    .save()
    .then((result) => {
      res.status(200).json({
        status: true,
        message: "Added data successfully",
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
};

const get = (req, res) => {
  console.log("in get", req.body);

  Home.findOne({ _id: "5fb93f0ba1015a3ef4c493c1" })
    .select("-_id -__v -createdAt -updatedAt")
    .then((result) => {
      // console.log(result);
      res.status(200).json({
        status: true,
        message: "Added data successfully",
        data: result,
      });
    })
    .catch((err) => {
      // console.log(err);
      res.status(500).json({
        status: false,
        message: err,
      });
    });
};

const update = (req, res) => {
  // Object.keys(req.body).forEach((el) => {
  // 	if (typeof req.body[el] === "string") {
  // 		req.body[el] = JSON.parse(req.body[el]);
  // 	}
  // });
  // console.log("update", req.body);
  let { data } = req.body;
  if (typeof data === "string") {
    data = JSON.parse(data);
  }

  Home.findOneAndUpdate({ _id: "5fb93f0ba1015a3ef4c493c1" }, data, {
    new: true,
  })
    .select("-_id -__v -createdAt -updatedAt")
    .then((result) => {
      res.status(200).json({
        status: true,
        message: "Updated data successfully",
        // data: result,/
      });
    })
    .catch((err) => {
      // console.log(err);
      res.status(500).json({
        status: false,
        message: err,
      });
    });
};

module.exports = {
  add,
  update,
  get,
};
