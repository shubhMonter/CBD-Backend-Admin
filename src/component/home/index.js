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
  Home.findOne({ _id: "5fc0036f1901fb3cbc09b2a6" })
    .select("-_id -__v -createdAt -updatedAt")
    .then((result) => {
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

const update = async (req, res) => {
  console.log(req.files);
  let section;
  if (req.body.addBanner) {
    section = "banner";
  } else {
    section = req.body.section;
  }
  let data;
  if (req.files && req.files.length > 0 && req.body.addBanner) {
    let home = await Home.findById("5fc0036f1901fb3cbc09b2a6");
    data = [...home["banner"]];
    const { title, content, btnText, hide } = req.body;
    data.push({
      title,
      content,
      btnText,
      hide,
      images: {
        name: req.files[0].originalname,
        src: req.files[0].path,
      },
    });
  } else if (req.files && req.files.length > 0) {
    let home = await Home.findById("5fc0036f1901fb3cbc09b2a6");
    if (req.body.section === "banner") {
      data = [...home[req.body.section]];
      data[req.body.mainIndex].images = {
        name: req.body.imageName,
        src: req.files[0].path,
      };
    } else {
      data = { ...home[req.body.section] };
      data.images[req.body.index] = {
        name:
          req.body.section === "logo"
            ? req.files[0].filename
            : req.body.imageName,
        src: req.files[0].path,
      };
    }
  } else {
    data = req.body.data;
  }

  // console.log(data);

  Home.findOneAndUpdate(
    { _id: "5fc0036f1901fb3cbc09b2a6" },
    { [section]: data },
    {
      new: true,
    }
  )
    .select("-_id -__v -createdAt -updatedAt")
    .then((result) => {
      res.status(200).json({
        status: true,
        message: "Updated data successfully",
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

module.exports = {
  add,
  update,
  get,
};
