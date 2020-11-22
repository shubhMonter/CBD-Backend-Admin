const async = require("async");
const { Learn, Sublearn, Questionnaire } = require("./learn.schema");

const getLearn = (req, res) => {
  Learn.find({})
    .then((result) => {
      return res.status(200).json({
        message: "Data Fetched Successfully",
        data: result,
      });
    })
    .catch((err) => res.status(400).json({ message: err.message }));
};

const addLearn = (req, res) => {
  const learn = new Learn(req.body);
  learn
    .save()
    .then((result) => {
      console.log(result);
      return res.status(200).json({
        message: "Data Added Successfully",
        data: result,
      });
    })
    .catch((err) =>
      res.status(400).json({
        message: err.message,
      })
    );
};

const editLearn = async (req, res) => {
  let learn = await Learn.findById({ _id: req.body._id });
  learn.title = req.body.title;
  learn
    .save()
    .then((result) =>
      res.status(200).json({ message: "Learn Edited Successfully" })
    )
    .catch((err) => res.status(400).json({ message: err.message }));
};

const deleteLearn = async (req, res) => {
  let learn = await Learn.findById({ _id: req.body._id });
  let questionnaireIds = [];
  let subLearnIds = [];
  learn.sublearn.forEach((item) => {
    subLearnIds.push(item._id);
  });
  let sublearns = await Sublearn.find({ _id: { $in: subLearnIds } });
  sublearns.forEach((item) => {
    item.questionnaire.forEach((item1) => {
      questionnaireIds.push(item1._id);
    });
  });
  await Questionnaire.deleteMany({ _id: { $in: questionnaireIds } });
  await Sublearn.deleteMany({ _id: { $in: subLearnIds } });
  Learn.deleteOne({ _id: req.body._id })
    .then((result) =>
      res.status(200).json({ message: "Learn Deleted Successfully" })
    )
    .catch((err) => res.status(400).json({ message: err.message }));
};

const addSubLearn = async (req, res) => {
  const { _id, questionnaire, ...rest } = req.body;
  const data = { ...rest };
  const subLearn = new Sublearn(data);
  // questionnaire[0].question !== "" &&
  async.eachSeries(
    questionnaire,
    (item, callback) => {
      let newQuestionnaire = new Questionnaire(item);
      newQuestionnaire.save().then((doc) => {
        subLearn.questionnaire.push(doc._id);
        callback();
      });
    },
    () => {
      subLearn
        .save()
        .then(async (result) => {
          const learn = await Learn.findById({ _id });
          const sublearn = [...learn.sublearn];
          sublearn.push(result._id);
          learn.sublearn = sublearn;
          learn.save().then((result) => {
            return res.status(200).json({
              message: "Data Added Successfully",
              data: result,
            });
          });
        })
        .catch((err) =>
          res.status(400).json({
            message: err.message,
          })
        );
    }
  );
  // return res.status(400).json({
  //   message: "Question was Empty",
  // });
};

const editSubLearn = async (req, res) => {
  let subLearn = await Sublearn.findById({ _id: req.body._id });
  if (req.body.type === "subTitle") {
    subLearn.subTitle = req.body.data;
  } else {
    subLearn.content = req.body.data;
  }
  subLearn
    .save()
    .then((result) =>
      res.status(200).json({ message: "Sublearn Edited Successfully" })
    )
    .catch((err) => res.status(400).json({ message: err.message }));
};

const deleteSubLearn = async (req, res) => {
  let learn = await Learn.findById({ _id: req.body._id });
  let sublearn = [...learn.sublearn];
  sublearn.filter((data) => data._id != req.body.__id);
  learn.sublearn = sublearn;
  let questionnaireIds = [];
  let sublearns = await Sublearn.findOne({ _id: req.body.__id });
  sublearns.questionnaire.forEach((item1) => {
    questionnaireIds.push(item1._id);
  });
  await Questionnaire.deleteMany({ _id: { $in: questionnaireIds } });
  await Sublearn.deleteOne({ _id: req.body.__id });
  learn
    .save()
    .then((result) =>
      res.status(200).json({ message: "Sublearn Deleted Successfully" })
    )
    .catch((err) => res.status(400).json({ message: err.message }));
};

const addQuestionnaire = async (req, res) => {
  const { _id, questionnaire } = req.body;
  const subLearn = await Sublearn.findById({ _id: _id });
  if (questionnaire.length === 0) {
    return res.status(400).json({
      message: "Question was Empty",
    });
  }
  let questionnaires = [];
  async.eachSeries(
    questionnaire,
    (item, callback) => {
      let newQuestionnaire = new Questionnaire(item);
      console.log(newQuestionnaire);
      newQuestionnaire.save().then((doc) => {
        questionnaires.push(doc);
        subLearn.questionnaire.push(doc._id);
        callback();
      });
    },
    () => {
      subLearn
        .save()
        .then(async (result) => {
          return res.status(200).json({
            message: "Data Added Successfully",
            data: questionnaires,
          });
        })
        .catch((err) =>
          res.status(400).json({
            message: err.message,
          })
        );
    }
  );
};

const editQuestionnaire = async (req, res) => {
  let questionnaire = await Questionnaire.findById({ _id: req.body._id });
  if (req.body.type === "question") {
    questionnaire.question = req.body.data;
  } else {
    questionnaire.answer = req.body.data;
  }
  questionnaire
    .save()
    .then((result) =>
      res.status(200).json({ message: "Questionnaire Edited Successfully" })
    )
    .catch((err) => res.status(400).json({ message: err.message }));
};

const deleteQuestionnaire = async (req, res) => {
  let sublearn = await Sublearn.findById({ _id: req.body._id });
  let questionnaire = [...sublearn.questionnaire];
  questionnaire.filter((data) => data._id != req.body.__id);
  sublearn.questionnaire = questionnaire;
  await Questionnaire.deleteOne({ _id: req.body.__id });
  sublearn
    .save()
    .then((result) =>
      res.status(200).json({ message: "Questionnaire Deleted Successfully" })
    )
    .catch((err) => res.status(400).json({ message: err.message }));
};

module.exports = {
  addLearn,
  editLearn,
  deleteLearn,
  getLearn,
  addSubLearn,
  editSubLearn,
  deleteSubLearn,
  addQuestionnaire,
  editQuestionnaire,
  deleteQuestionnaire,
};
