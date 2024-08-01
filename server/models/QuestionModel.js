// models/QuestionModel.js
const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        required: true,
    }
});

module.exports = mongoose.model("Question", questionSchema);
