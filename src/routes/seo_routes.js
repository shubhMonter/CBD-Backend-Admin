const express = require("express");
const router = express.Router();
const controller = require("../component/SEO");

router.post("/add", controller.Add);
router.post("/update", controller.edit);
router.get("/get", controller.get);
router.get("/get/:title",controller.getByTitle);
router.get("/get/id/:id",controller.getById);
router.delete("/delete/:id",controller.deleted);


module.exports = router;
