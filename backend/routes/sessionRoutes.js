const express = require('express');
const { createSession, getMySessions, updateSessionById, deleteSession } = require('../controllers/sessionController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', protect, createSession);
router.get('/', protect, getMySessions);
router.put('/:id', protect, updateSessionById);
router.delete('/:id', protect, deleteSession);

module.exports = router;