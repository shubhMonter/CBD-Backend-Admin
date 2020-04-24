const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Home = new Schema(
	{
		// banner: {
		// 	title: { type: String },
		// 	content: { type: String },
		// 	btnText: { type: String },
		// },
		// categorySlider: {
		// 	title: { type: String },
		// },
		// thirdSection: {
		// 	bigTitle: { type: String },
		// 	title: { type: String },
		// 	content: { type: String },
		// 	btnText: { type: String },
		// },
		// bundlesSlider: {
		// 	title: { type: String },
		// 	subTitle: { type: String },
		// 	btnText: { type: String },
		// },
		// fifthSection: {
		// 	title: { type: String },
		// 	content: { type: String },
		// 	btnText: { type: String },
		// },
		banner: {
			type: Object,
		},
		categorySlider: {
			type: Object,
		},
		thirdSection: {
			type: Object,
		},
		bundlesSlider: {
			type: Object,
		},
		fifthSection: {
			type: Object,
		},
		default: { type: Object },
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("home", Home);
