const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Shop = new Schema(
	{
		// shop: {
		// 	title: { type: String },
		// 	bundleTitle: { type: String },
		// 	bundleSubTitle: { type: String },
		// },
		shop: {
			type: Object,
		},
		tags:[String]
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("shop", Shop);
