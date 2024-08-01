// models/UserQuestionModel.js
const mongoose = require("mongoose");

const userQuestionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
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
    },
    solved: {
        type: Boolean,
        default: false,
    }
});

module.exports = mongoose.model("UserQuestion", userQuestionSchema);
