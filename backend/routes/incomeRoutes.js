import express from 'express';
import {
  postIncome,
  getMonthlyIncome,
} from '../controllers/incomeControllers.js';
import { auth } from '../middlewares/auth.js';

const router = express.Router();

router.post('/', auth, postIncome);
router.get('/monthly', auth, getMonthlyIncome);

export default router;
