import express from 'express';
import ProductController from '../controllers/product.controller.js';
import { authenticateToken, authorizeRoles } from '../middleware/auth.middleware.js';

const router = express.Router();

// OPEN ROUTES (No token required just to read the catalog)
router.get('/', ProductController.getAll);
router.get('/:id', ProductController.getById);

// SECURED ROUTES (Strictly requires admin login credentials to execute)
router.post('/', authenticateToken, authorizeRoles('admin'), ProductController.create);
router.put('/:id', authenticateToken, authorizeRoles('admin'), ProductController.update);
router.delete('/:id', authenticateToken, authorizeRoles('admin'), ProductController.delete);

export default router;
