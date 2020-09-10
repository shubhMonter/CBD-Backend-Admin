const Category = require("./category.schema");

const add = (req, res) => {
	console.log(req.body);
	const data = new Category(req.body);
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

	Category.find()
		.select(" -__v -createdAt -updatedAt")
		.then((result) => {

			const data =result.map(i=>{
					content ={
						bannerTitle:i.bannerTitle,
						title:i.title,
						content:i.content,
						bundleTitle:i.bundleTitle,
						bundleContent:i.bundleContent,
					}
					cat={
						id:i._id,
						category:i.category
					}
					return {content,cat}
				})
				console.log(data);
			res.status(200).json({
				status: true,
				message: "Added data successfully",
				data: [data[0].content],
				categories: [data[0].cat],
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
	console.log("update category", req.body);
	let data;
	if (typeof req.body.data === "string") data = JSON.parse(req.body.data);
	else {
		data = req.body.data;
	}
	console.log(data);

	Category.findOneAndUpdate({ _id: req.params.id }, data, {
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
