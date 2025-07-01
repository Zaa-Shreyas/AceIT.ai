const express = require('express');
const { togglePinQuestion, updatQuestionNote, addQuestionsToSession } = require('../controllers/questionController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', protect, addQuestionsToSession);
router.post('/:id/pin', protect, togglePinQuestion);
router.post('/:id/note', protect, updatQuestionNote);

module.exports = router;