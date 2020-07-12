const Shop = require("./shop.schema");

const add = (req, res) => {
	console.log(req.body);
	const data = new Shop(req.body);
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

	Shop.findOne({ _id: "5f0b3a8acc9ac433df99b037" })
		.select("-_id -__v -createdAt -updatedAt")
		.then((result) => {
			res.status(200).json({
				status: true,
				message: "Fetched data successfully",
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

	Shop.findOneAndUpdate({ _id: "5f0b3a8acc9ac433df99b037" }, data, {
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
