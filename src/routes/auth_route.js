const express = require("express");
const router = express.Router();
const controller = require("../component/Auth");

router.post("/signIn", controller.signIn);

router.post("/signUp", controller.signUp);

module.exports = router;
