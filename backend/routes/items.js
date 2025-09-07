import express from 'express';
import Item from '../models/Item.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Create item
router.post('/', authMiddleware, async (req, res) => {
  try {
    const item = new Item(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ message: 'Invalid data' });
  }
});

// Get items with filters
router.get('/', async (req, res) => {
  const { priceMin, priceMax, category, name } = req.query;
  let filter = {};
  if (priceMin || priceMax) filter.price = {};
  if (priceMin) filter.price.$gte = Number(priceMin);
  if (priceMax) filter.price.$lte = Number(priceMax);
  if (category) filter.category = category;
  if (name) filter.name = { $regex: name, $options: 'i' };
  try {
    const items = await Item.find(filter);
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single item
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
  } catch (err) {
    res.status(400).json({ message: 'Invalid ID' });
  }
});

// Update item
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
  } catch (err) {
    res.status(400).json({ message: 'Invalid data' });
  }
});

// Delete item
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(400).json({ message: 'Invalid ID' });
  }
});

export default router;
