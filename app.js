const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const db = require("./db");
const cors = require("cors");
var multer = require("multer");
const jwt = require("express-jwt");
const compression = require('compression');
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(express.static("public"));
app.use(cors(process.env.connect_url));
//app.use(compression());
// Questionnaire.find({}).then((result) => {
//   console.log(result);
// });

// Sublearn.find({}).then(async (result) => {
//   console.log(result);
// });


const data = {
  secondSection: {
    title: "<h3>Trusted, easy, and affordable.</h3>",
    bigTitle: "<h1>that’s where we come in!</h1>",
    hide: false,
    images: [
      {
        name: "Banner-Image-1.png",
        src: "public/Banner-Image-1.png",
      },
    ],
  },
  fourthSection: {
    title: '<p class="heading">HONEST INGREDIENTS AND PROCESS</p>',
    content:
      '<div class="honest-container">\n<div class="img-wrapper">\n<img src="/images/organic.svg" class="honest-svg"/>\n<p class="img-head-text">ORGANICALLY GROWN</p>\n<p class="img-sub-text">The extracts used in our products are obtained from organically grown hemp devoid of any harmful chemical inputs.</p>\n</div>\n<div class="img-wrapper">\n<img src="/images/thc.svg" class="honest-svg"/>\n<p class="img-head-text">0.0% THC</p>\n<p class="img-sub-text">We take great care to ensure that the products reaching you are completely free of any THC. Only the goodness of hemp for you.</p>\n</div>\n<div class="img-wrapper">\n<img src="/images/vegan.svg" class="honest-svg"/>\n<p class="img-head-text">VEGAN PRODUCTS</p>\n<p class="img-sub-text">We care about your dietary preferences. Hence, our wide range of vegan products infused with the goodness of CBD is curated keeping you in mind.</p>\n</div>\n</div>',
    hide: false,
    images: [
      {
        name: "Banner-Image-1.png",
        src: "public/Banner-Image-1.png",
      },
    ],
  },
};


// home.create(data).then((result) => console.log(result._id));

// home
//   .findOneAndUpdate({ _id: "5fc0036f1901fb3cbc09b2a6" }, data, {
//     new: true,
//   })
//   .then((result) => console.log("done"));

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
const Banner = require("./src/routes/banner_route");
const Learn = require("./src/routes/learn_route");

app.use("/Home", Home);
app.use("/Shop", Shop);
app.use("/Category", Category);
app.use("/Blog", Blog);
app.use("/Image", Image);
app.use("/Auth", Auth);
app.use("/Banner", Banner);
app.use("/Learn", Learn);
const port = process.env.PORT || 5000;
const server = app.listen(port, function () {
  console.log(`Server listening on port ${port}`);
});
