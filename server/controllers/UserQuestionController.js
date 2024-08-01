// controllers/UserQuestionController.js
const UserQuestion = require("../models/UserQuestionModel");

module.exports.getUserQuestions = async (req, res) => {
    try {
        const userQuestions = await UserQuestion.find({ userId: req.user._id });
        res.status(200).json(userQuestions);
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports.createUserQuestion = async (req, res) => {
    try {
        const userQuestion = await UserQuestion.create({ ...req.body, userId: req.user._id });
        res.status(201).json(userQuestion);
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports.updateUserQuestion = async (req, res) => {
    try {
        const userQuestion = await UserQuestion.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(userQuestion);
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports.deleteUserQuestion = async (req, res) => {
    try {
        await UserQuestion.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "User question deleted" });
    } catch (err) {
        res.status(500).json(err);
    }
};
