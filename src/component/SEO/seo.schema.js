const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let SEO = new Schema(
	{
		title:{
            type:String,
            unique:true,
            required:true
        },
        titleContent:{
            type:String,
            required:true
        },
        keywords:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        }

	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("seo", SEO);