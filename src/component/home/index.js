const Home = require("./home.schema");

const add = (req, res) => {
	console.log(req.body);
	const data = new Home(req.body);
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

	Home.findOne({ _id: "5ea0b76f3ad92616f53700ae" })
		.select("-_id -__v -createdAt -updatedAt")
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

const update = (req, res) => {
	console.log("update", req.body);
	let data;
	if (typeof req.body.data === "string") data = JSON.parse(req.body.data);
	else {
		data = req.body.data;
	}
	console.log(data);

	Home.findOneAndUpdate({ _id: "5ea0b76f3ad92616f53700ae" }, data, {
		new: true,
	})
		.select("-_id -__v -createdAt -updatedAt")
		.then((result) => {
			res.status(200).json({
				status: true,
				message: "Updated data successfully",
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

module.exports = {
	add,
	update,
	get,
};
