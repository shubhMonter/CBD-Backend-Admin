const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const db = require("./db");
const cors = require("cors");
var multer = require("multer");
var forms = multer();
const jwt = require("express-jwt");
const home = require("./src/component/home/home.schema");
// app.use(forms.array());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(express.static("public"));
app.use(cors(process.env.connect_url));

// category.deleteMany({}, (err, data) => console.log("deleted"));
const data = {
  logo: "",
  banner: {
    title:
      '<h2 class="c-banner__heading"><span class="c-banner__heading__leftSpan">bené-fits <br></span> <span class="c-banner__heading__rightSpan">your life.</span></h2>',
    content:
      '<p class="c-banner__text">\n<span>\nGive your body the goodness that it deserves with our entire line of premium products. Join us in the journey of alleviating stress and rejuvenation with the help of the benefits of organically grown hemp CBD\n</span>\n</p>',
    btnText: "<span>Shop now</span>",
    hide: false,
  },
  categorySlider: {
    title: "DISCOVER THE PRODUCT LINE",
    btnText: "SEE ALL PRODUCTS",
    hide: false,
  },
  secondSection: {
    title: "LEARN MORE ABOUT CBD",
    bigTitle: "explore the bené journal",
    hide: false,
  },
  thirdSection: {
    bigTitle: "bené",
    title: "Organic Hemp for the Body and Mind",
    content:
      "Give your body the goodness from within with our entire line of premium products containing organically grown hemp extract. Rejuvenate your body and mind by Products which are easy to use, certified by a third-party lab and free from solvents and harsh chemicals.",
    btnText: "",
    hide: false,
  },
  fourthSection: {
    title: '<p class="heading">HONEST INGREDIENTS AND PROCESS</p>',
    content:
      '<div class="honest-container">\n<div class="img-wrapper">\n<img src="/images/organic.svg" class="honest-svg"/>\n<p class="img-head-text">ORGANICALLY GROWN</p>\n<p class="img-sub-text">The extracts used in our products are obtained from organically grown hemp devoid of any harmful chemical inputs.</p>\n</div>\n<div class="img-wrapper">\n<img src="/images/thc.svg" class="honest-svg"/>\n<p class="img-head-text">0.0% THC</p>\n<p class="img-sub-text">We take great care to ensure that the products reaching you are completely free of any THC. Only the goodness of hemp for you.</p>\n</div>\n<div class="img-wrapper">\n<img src="/images/vegan.svg" class="honest-svg"/>\n<p class="img-head-text">VEGAN PRODUCTS</p>\n<p class="img-sub-text">We care about your dietary preferences. Hence, our wide range of vegan products infused with the goodness of CBD is curated keeping you in mind.</p>\n</div>\n</div>',
    hide: false,
  },
};

// const newHome = new home(data);

// newHome.save().then((result) => {
// res.status(200).json({
//   status: true,
//   message: "Added data successfully",
//   data: result,
// });
//   console.log(result);
// });

// home
//   .findOneAndUpdate({ _id: "5fac001a6041f51a78701a63" }, data, {
//     new: true,
//   })
//   .select("-_id -__v -createdAt -updatedAt")
//   .then((result) => {
//     console.log("done");
//     // res.status(200).json({
//     //   status: true,
//     //   message: "Updated data successfully",
//     //   data: result,
//     // });
//   })
//   .catch((err) => {
//     console.log(err);
//     res.status(500).json({
//       status: false,
//       message: err,
//     });
//   });

// home
//   .findByIdAndDelete("5fabfb8b76e9ac24d467c3df")
//   .then((result) => console.log(result));

// app.use(
// 	jwt({
// 		secret: "Bene",
// 		credentialsRequired: true,
// 		getToken: function fromHeaderOrQuerystring(req) {
// 			// console.log(req.headers);
// 			if (
// 				req.headers.authorization &&
// 				req.headers.authorization.split(" ")[0] === "Bearer"
// 			) {
// 				return req.headers.authorization.split(" ")[1];
// 			} else if (req.query && req.query.token) {
// 				return req.query.token;
// 			} else {
// 				console.log("in else", req.originalUrl);
// 				return null;
// 			}
// 		},
// 	}).unless({
// 		path: [
// 			"/Auth/signIn",
// 			"/Auth/signUp",
// 			"/Home/get",
// 			"/Category/get",
// 			"/Shop/get",
// 			"/Blog/get/tag",
// 		],
// 	})
// );

const Home = require("./src/routes/home_route");
const Shop = require("./src/routes/shop_route");
const Category = require("./src/routes/category_route");
const Blog = require("./src/routes/blog_route");
const Image = require("./src/routes/image_route");
const Auth = require("./src/routes/auth_route");

app.use("/Home", Home);
app.use("/Shop", Shop);
app.use("/Category", Category);
app.use("/Blog", Blog);
app.use("/Image", Image);
app.use("/Auth", Auth);
const port = process.env.PORT || 5000;
const server = app.listen(port, function () {
  console.log(`Server listening on port ${port}`);
});
