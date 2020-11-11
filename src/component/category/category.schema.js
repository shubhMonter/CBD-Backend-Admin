const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Category = new Schema(
  {
    category: String,
    bannerTitle: { type: String },
    subTitle: { type: String },
    content: { type: String },
    image: { type: Object },
    logo: { type: Object },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("category", Category);
