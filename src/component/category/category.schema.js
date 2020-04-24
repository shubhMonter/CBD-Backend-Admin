const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Category = new Schema(
	{
		// topicals: {
		// 	bannerTitle: { type: String },
		// 	title: { type: String },
		// 	content: { type: String },
		// 	bundleTitle: { type: String },
		// 	bundleContent: { type: String },
		// },
		// pets: {
		// 	bannerTitle: { type: String },
		// 	title: { type: String },
		// 	content: { type: String },
		// 	bundleTitle: { type: String },
		// 	bundleContent: { type: String },
		// },
		// edibles: {
		// 	bannerTitle: { type: String },
		// 	title: { type: String },
		// 	content: { type: String },
		// 	bundleTitle: { type: String },
		// 	bundleContent: { type: String },
		// },
		// capsules: {
		// 	bannerTitle: { type: String },
		// 	title: { type: String },
		// 	content: { type: String },
		// 	bundleTitle: { type: String },
		// 	bundleContent: { type: String },
		// },
		// oils: {
		// 	bannerTitle: { type: String },
		// 	title: { type: String },
		// 	content: { type: String },
		// 	bundleTitle: { type: String },
		// 	bundleContent: { type: String },
		// },
		// bundles: {
		// 	bannerTitle: { type: String },
		// 	title: { type: String },
		// 	content: { type: String },
		// 	bundleTitle: { type: String },
		// 	bundleContent: { type: String },
		// },

		// default: {
		// 	bannerTitle: { type: String },
		// 	title: { type: String },
		// 	content: { type: String },
		// 	bundleTitle: { type: String },
		// 	bundleContent: { type: String },
		// },
		topicals: {
			type: Object,
		},
		pets: {
			type: Object,
		},
		edibles: {
			type: Object,
		},
		capsules: {
			type: Object,
		},
		oils: {
			type: Object,
		},
		bundles: {
			type: Object,
		},

		default: {
			type: Object,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("category", Category);
