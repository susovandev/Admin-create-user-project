import { Router } from 'express';
import adminController from '../controllers/admin.controller.js';

const router = Router();
router.get('/create', adminController.getCreateUserPage);
router.post('/create', adminController.create);
router.get('/list', adminController.getAllUsers);

export default router;
