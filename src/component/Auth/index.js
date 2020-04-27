const User = require("./user.schema");
const _ = require("underscore");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const saltRounds = 10;
signUp = (req, res) => {
	bcrypt.hash(req.body.password, saltRounds).then(function (hash) {
		console.log(hash);
		let data = new User({ ...req.body, password: hash });
		data
			.save()
			.then((result) => {
				res.status(200).json({
					status: true,
					message: "Successfully added user",
					data: result,
				});
			})
			.catch((err) => {
				res.status(500).json({
					status: false,
					message: err,
				});
			});
	});
};

signIn = (req, res) => {
	console.log(req.body);
	User.findOne({ email: req.body.email }).then((result) => {
		// console.log(result);
		// bcrypt.compare(req.body.password, result.password).then((status) => {
		// 	console.log("status", status);
		// });
		if (_.isEmpty(result)) {
			res.status(500).json({
				status: false,
				message: "No such User",
			});
		} else {
			console.log(result);
			bcrypt
				.compare(req.body.password, result.password)
				.then(function (result) {
					console.log(result);
					var token = jwt.sign({ username: req.body.email }, "Bene");
					if (result) {
						res.status(200).json({
							status: true,
							message: "Successfully logged in",
							token: token,
						});
					} else {
						res.status(500).json({
							status: false,
							message: "Incorrect password",
						});
					}
				});
		}
	});
};

module.exports = {
	signIn,
	signUp,
};
