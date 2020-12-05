const multer = require("multer");
const router = require("express").Router();
const path = require("path");
let storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "public");
	},
	filename: (req, file, cb) => {
		console.log("body in file name", req.body);
		let filename = file.originalname.split(".")[0];
		let name = req.body.imageName;
		cb(
			null,
			name + ".png"
			// `${req.body.author}-${Date.now()}${path.extname(file.originalname)}`
		);
	},
});

let upload = multer({
	storage: storage,
	fileFilter: function (req, file, callback) {
		var ext = path.extname(file.originalname);
		if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg" && ext !==".webp") {
			req.fileValidationError = "Forbidden extension";
			return callback(null, false, req.fileValidationError);
		}
		callback(null, true);
	},
});

router.post("/add", upload.any(), (req, res) => {
	// console.log(req.body.heading, req.body.tags);
	console.log(req.files);
	if (req.files.length > 0) {
		res.status(200).json({
			message: "Successfully added image",
			status: true,
		});
	} else {
		res.status(500).json({
			message: "Please select an image",
			status: false,
		});
	}
});

module.exports = router;
