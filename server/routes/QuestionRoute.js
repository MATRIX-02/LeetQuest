// routes/QuestionRoute.js
const express = require('express');
const { getQuestions, createQuestion, updateQuestion, deleteQuestion } = require('../controllers/QuestionController');
const { userVerification } = require('../middlewares/AuthMiddleware');
const { isAdmin } = require('../middlewares/AdminMiddleware');

const router = express.Router();

router.get('/', userVerification, getQuestions);
router.post('/', userVerification, isAdmin, createQuestion);
router.put('/:id', userVerification, isAdmin, updateQuestion);
router.delete('/:id', userVerification, isAdmin, deleteQuestion);

module.exports = router;
