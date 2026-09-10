import express from 'express';
import {
  createOrder,
  getOrderById,
  getMyOrders,
  getAllOrders,
  updateOrderToPaid,
  updateOrderStatus,
  createPaymentIntent,
} from '../controllers/orderController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';
import { validate } from '../middlewares/validationMiddleware.js';
import { createOrderValidation } from '../validations/orderValidation.js';

const router = express.Router();

router.route('/')
  .post(protect, validate(createOrderValidation), createOrder)
  .get(protect, authorize('admin'), getAllOrders);

router.get('/myorders', protect, getMyOrders);
router.post('/create-payment-intent', protect, createPaymentIntent);
router.put('/:id/pay', protect, updateOrderToPaid);
router.put('/:id/status', protect, authorize('admin'), updateOrderStatus);
router.get('/:id', protect, getOrderById);

export default router;