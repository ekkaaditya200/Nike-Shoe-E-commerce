import express from 'express';
import { signup, signin, verifyToken, getUser, logout } from '../Controllers/auth.controller.js';
const router = express.Router();

router.post('/signup',signup);
router.post('/signin',signin);
router.get('/user', verifyToken, getUser);
router.post('/logout/:id', verifyToken, logout);

export default router;