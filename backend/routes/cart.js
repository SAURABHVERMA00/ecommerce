import express from 'express';
import User from '../models/User.js';
import Item from '../models/Item.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Get cart
router.get('/', authMiddleware, async (req, res) => {
  const user = await User.findById(req.userId).populate('cart.item');
  res.json(user.cart);
});

// Add to cart
router.post('/add', authMiddleware, async (req, res) => {
  const { itemId, quantity } = req.body;
  const user = await User.findById(req.userId);
  const item = await Item.findById(itemId);
  if (!item) return res.status(404).json({ message: 'Item not found' });
  const cartItem = user.cart.find(c => c.item.equals(itemId));
  if (cartItem) {
    cartItem.quantity += quantity || 1;
  } else {
    user.cart.push({ item: itemId, quantity: quantity || 1 });
  }
  await user.save();
  res.json(user.cart);
});

// Remove from cart
router.post('/remove', authMiddleware, async (req, res) => {
  const { itemId } = req.body;
  const user = await User.findById(req.userId);
  user.cart = user.cart.filter(c => !c.item.equals(itemId));
  await user.save();
  res.json(user.cart);
});

export default router;
