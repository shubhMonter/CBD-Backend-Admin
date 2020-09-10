const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Category = new Schema(
	{
			category:String,
			bannerTitle: { type: String },
			title: { type: String },
			content: { type: String },
			bundleTitle: { type: String },
			bundleContent: { type: String },
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("category", Category);
