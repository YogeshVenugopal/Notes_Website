import express from 'express';
import { createUser, loginUser } from '../Controllers/Authentication.controller.js';

const router = express.Router();

router.post('/create-account', createUser);
router.post('/login', loginUser);

export default router;