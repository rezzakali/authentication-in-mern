// external imports
import { Router } from 'express';

// internal imports
import loginController from '../controller/loginController.js';
import logoutController from '../controller/logoutController.js';
import registerController from '../controller/registerController.js';
import authorization from '../middlewares/authentication.js';

// router
const router = Router();

// register router
router.post('/register', registerController);

// login router
router.post('/login', loginController);

// logout router
router.get('/logout', logoutController);

// auth
router.get('/auth', authorization);

export default router;
