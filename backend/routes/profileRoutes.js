import express from 'express';
import { auth } from '../middlewares/auth.js';

let router = express.Router();

router.get('/profile', auth, (req, res, next) => {
  res.send('hello');
});

export default router;
