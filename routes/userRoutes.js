import {Router} from 'express';
import { register, login } from '../controllers/userControllers.js';
import upload from '../middlewares/fileUpload.js';
const router = Router();

router.post('/register', upload.single('photo'),register);
router.post('/login', login);

export default router;
