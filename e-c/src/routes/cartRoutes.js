import express from 'express';
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from '../controllers/cartController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { validate } from '../middlewares/validationMiddleware.js';
import { addToCartValidation, updateCartItemValidation } from '../validations/cartValidation.js';

const router = express.Router();

router.route('/')
  .get(protect, getCart)
  .post(protect, validate(addToCartValidation), addToCart)
  .delete(protect, clearCart);

router.route('/:itemId')
  .put(protect, validate(updateCartItemValidation), updateCartItem)
  .delete(protect, removeFromCart);

export default router;