const express = require("express");
const router = express.Router();
const controller = require("../component/blog");

router.post("/add", controller.add);
router.post("/update", controller.update);
router.delete("/delete/:id", controller.Delete);
router.get("/get/:id", controller.get);
router.get("/get/tag/:tag", controller.getByType);

module.exports = router;
