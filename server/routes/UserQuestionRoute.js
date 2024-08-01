// routes/UserQuestionRoute.js
const express = require('express');
const { getUserQuestions, createUserQuestion, updateUserQuestion, deleteUserQuestion } = require('../controllers/UserQuestionController');
const { userVerification } = require('../middlewares/AuthMiddleware');

const router = express.Router();

router.get('/', userVerification, getUserQuestions);
router.post('/', userVerification, createUserQuestion);
router.put('/:id', userVerification, updateUserQuestion);
router.delete('/:id', userVerification, deleteUserQuestion);

module.exports = router;