const express = require("express");
const router = express.Router();
const controller = require("../component/learn");

router.get("/getLearn", controller.getLearn);
router.post("/addLearn", controller.addLearn);
router.post("/editLearn", controller.editLearn);
router.post("/deleteLearn", controller.deleteLearn);
router.post("/addSubLearn", controller.addSubLearn);
router.post("/editSubLearn", controller.editSubLearn);
router.post("/deleteSubLearn", controller.deleteSubLearn);
router.post("/addQuestionnaire", controller.addQuestionnaire);
router.post("/editQuestionnaire", controller.editQuestionnaire);
router.post("/deleteQuestionnaire", controller.deleteQuestionnaire);
module.exports = router;
