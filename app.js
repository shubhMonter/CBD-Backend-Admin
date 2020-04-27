const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const db = require("./db");
const cors = require("cors");
var multer = require("multer");
var forms = multer();
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(forms.array());
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(cors("http://localhost:4000"));

const Home = require("./src/routes/home_route");
const Shop = require("./src/routes/shop_route");
const Category = require("./src/routes/category_route");
const Blog = require("./src/routes/blog_route");
const Image = require("./src/routes/image_route");

app.use("/Home", Home);
app.use("/Shop", Shop);
app.use("/Category", Category);
app.use("/Blog", Blog);
app.use("/Image", Image);
const port = process.env.PORT || 4000;
const server = app.listen(port, function () {
	console.log(`Server listening on port ${port}`);
});
