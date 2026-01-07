import { Router } from 'express';
import userController from '../controllers/user.controller.js';
const router = Router();

router.route('/login').get(userController.getLoginPage);
router.route('/login').post(userController.loginHandler);

router.route('/logout').get(userController.logoutHandler);

router.route('/profile').get(userController.getProfilePage);

router.route('/edit-profile').get(userController.getUpdateProfilePage);

router.route('/update-password').get(userController.getUpdateProfilePage);
router.route('/update-password').post(userController.updatePasswordHandler);

export default router;
