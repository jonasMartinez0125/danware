import { Router } from 'express';
import { profile, signin, signup } from '../controllers/auth.controller';
import { verifyToken } from '../middlewares/auth.middleware';

const router = Router();

router.post('/auth/signin', signin);
router.post('/auth/signup', signup);
router.get('/auth/profile', verifyToken, profile);

export default router;