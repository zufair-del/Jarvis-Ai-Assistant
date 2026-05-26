import express from 'express';
import authController from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/register' , authController.UserControllerRegister);
router.post('/login' , authController.UserControllerLogin);
router.post('/logout' , authController.UserControllerLogout);

export default router;
