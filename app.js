const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const db = require("./db");
const cors = require("cors");
var multer = require("multer");
var forms = multer();
const jwt = require("express-jwt");
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(forms.array());
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(cors("http://localhost:4000"));

app.use(
	jwt({
		secret: "Bene",
		credentialsRequired: true,
		getToken: function fromHeaderOrQuerystring(req) {
			console.log(req.headers);
			if (
				req.headers.authorization &&
				req.headers.authorization.split(" ")[0] === "Bearer"
			) {
				return req.headers.authorization.split(" ")[1];
			} else if (req.query && req.query.token) {
				return req.query.token;
			} else {
				console.log("in else", req.headers.authorization);
				return null;
			}
		},
	}).unless({ path: ["/Auth/signIn", "/Auth/signUp"] })
);

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
const port = process.env.PORT || 4000;
const server = app.listen(port, function () {
	console.log(`Server listening on port ${port}`);
});
