import { Router } from 'express';
import { createSession, getMySession, updateSessionById, deleteSession } from '../controllers/sessionController';
import { protect } from '../middlewares/authMiddleware';

const router = Router();

router.post('/create', protect, createSession);
router.get('/my-sessions', protect, getMySession);
router.put('/:id', protect, updateSessionById);
router.delete('/:id', protect, deleteSession);

export default router;