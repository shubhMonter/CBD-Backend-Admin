const Blog = require("./blog.schema");

const add = (req, res) => {
	let tags = [];
	if (typeof req.body.tags === "string") {
		tags = JSON.parse(req.body.tags);
	} else {
		tags = req.body.tags;
	}
	let data = new Blog({ ...req.body, tags });
	data
		.save()
		.then((result) => {
			res.status(200).json({
				status: true,
				message: "Successfully added blog",
				data: result,
			});
		})
		.catch((err) => {
			res.status(500).json({
				status: false,
				message: err,
			});
		});
};

const update = (req, res) => {
	Blog.findOneAndUpdate({ _id: req.body.id }, req.body, { new: true })
		.then((result) => {
			res.status(200).json({
				status: true,
				message: "Successfully updated blog",
				data: result,
			});
		})
		.catch((err) => {
			res.status(500).json({
				status: false,
				message: err,
			});
		});
};

const get = (req, res) => {
	// console.log(req.params.id);
	Blog.findById(req.params.id)
		.then((result) => {
			res.status(200).json({
				status: true,
				message: "Successfully fetched blog",
				data: result,
			});
		})
		.catch((err) => {
			res.status(500).json({
				status: false,
				message: err,
			});
		});
};

const Delete = (req, res) => {
	console.log(req.params.id);
	Blog.findOneAndDelete({ _id: req.params.id })
		.then((result) => {
			res.status(200).json({
				status: true,
				message: "Successfully deleted blog",
				data: result,
			});
		})
		.catch((err) => {
			res.status(500).json({
				status: false,
				message: err,
			});
		});
};

const getByType = (req, res) => {
	console.log(req.params.tag);
	Blog.find({ tags: req.params.tag })
		.then((result) => {
			res.status(200).json({
				status: true,
				message: "Successfully fetched blogs",
				data: result,
			});
		})
		.catch((err) => {
			res.status(500).json({
				status: false,
				message: err,
			});
		});
};

module.exports = {
	add,
	get,
	update,
	Delete,
	getByType,
};
