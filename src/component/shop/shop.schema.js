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
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("shop", Shop);
