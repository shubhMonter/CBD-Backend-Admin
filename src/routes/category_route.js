const express = require("express");
const router = express.Router();
const controller = require("../component/category");

router.post("/add", controller.add);
router.post("/update", controller.update);
router.get("/get", controller.get);
router.get("/getData/:name", controller.getByName);
router.post("/delete", controller.deletee);
module.exports = router;
