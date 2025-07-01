import { Router } from 'express';
import { togglePinQuestion, updatQuestionNote, addQuestionsToSession } from '../controllers/questionController';
import { protect } from '../middlewares/authMiddleware';

const router = Router();

router.post('/add', protect, addQuestionsToSession);
router.post('/:id/pin', protect, togglePinQuestion);
router.post('/:id/note', protect, updatQuestionNote);

export default router;