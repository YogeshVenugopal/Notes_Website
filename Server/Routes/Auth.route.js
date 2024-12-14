import express from 'express';
import { createUser, getUser, loginUser } from '../Controllers/Authentication.controller.js';
import AuthenticationToken from '../utilities.js';
const router = express.Router();

router.post('/create-account', createUser);
router.post('/login', loginUser);
router.get('/get-user',AuthenticationToken, getUser);
export default router;