import express from 'express';
const router = express.Router();
import { signUpCustomer, signUpFarmer } from '../controller/signUp.js';

router.post('/farmer', signUpFarmer);
router.post('/customer', signUpCustomer);

export default router;
