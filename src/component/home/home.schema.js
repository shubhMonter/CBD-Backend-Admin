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
    logo: {
      type: Object,
    },
    banner: {
      type: Array,
    },
    categorySlider: {
      type: Object,
    },
    secondSection: {
      type: Object,
    },
    thirdSection: {
      type: Object,
    },
    fourthSection: {
      type: Object,
    },
    default: { type: Object },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("home", Home);
