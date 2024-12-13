import express from 'express';
import { createUser, getUser, loginUser } from '../Controllers/Authentication.controller.js';
const router = express.Router();

router.post('/create-account', createUser);
router.post('/login', loginUser);
router.get('/get-user', getUser);
export default router;