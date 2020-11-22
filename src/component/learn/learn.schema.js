const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autopopulate = require("mongoose-autopopulate");

let Learn = new Schema(
  {
    title: String,
    sublearn: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sublearn",
        autopopulate: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

let Sublearn = new Schema(
  {
    subTitle: String,
    content: String,
    questionnaire: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Questionnaire",
        autopopulate: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

let Questionnaire = new Schema({
  question: String,
  answer: String,
});

Learn.plugin(autopopulate);
Sublearn.plugin(autopopulate);

module.exports = {
  Learn: mongoose.model("Learn", Learn),
  Sublearn: mongoose.model("Sublearn", Sublearn),
  Questionnaire: mongoose.model("Questionnaire", Questionnaire),
};
