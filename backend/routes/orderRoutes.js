import express from 'express';
import Order from '../models/orderModel.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// POST /api/orders
router.post('/', async (req, res) => {
  try {
    const order = new Order(req.body);
    const saved = await order.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save order' });
  }
});

// GET /api/orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});
router.get('/', protect, async (req, res) => {
  // Return orders for req.user.id
});

export default router;
