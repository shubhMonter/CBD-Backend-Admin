const express = require("express");
const router = express.Router();
const controller = require("../component/home");

router.post("/add", controller.add);
router.post("/update", controller.update);
router.get("/get", controller.get);
module.exports = router;
