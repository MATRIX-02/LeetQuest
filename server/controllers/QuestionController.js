// controllers/QuestionController.js
const Question = require("../models/QuestionModel");

module.exports.getQuestions = async (req, res) => {
    try {
        const questions = await Question.find();
        res.status(200).json(questions);
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports.createQuestion = async (req, res) => {
    try {
        const question = await Question.create(req.body);
        res.status(201).json(question);
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports.updateQuestion = async (req, res) => {
    try {
        const question = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(question);
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports.deleteQuestion = async (req, res) => {
    try {
        await Question.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Question deleted" });
    } catch (err) {
        res.status(500).json(err);
    }
};
