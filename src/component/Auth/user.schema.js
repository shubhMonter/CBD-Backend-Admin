const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let User = new Schema(
	{
		name: { type: String },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("user", User);
