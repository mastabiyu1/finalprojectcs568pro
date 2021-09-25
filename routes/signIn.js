import express from 'express';
const router = express.Router();
import { signIn } from '../controller/signIn.js';

router.post('/', signIn);

export default router;
