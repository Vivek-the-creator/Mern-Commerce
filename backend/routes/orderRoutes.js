import express from 'express';
import mongoose from 'mongoose';
import Order from '../models/orderModel.js';

const router = express.Router();
const inMemoryOrders = [];

// POST /api/orders
router.post('/', async (req, res) => {
  try {
    const isDbConnected = mongoose.connection.readyState === 1;

    if (isDbConnected) {
      const order = new Order(req.body);
      const saved = await order.save();
      return res.status(201).json(saved);
    } else {
      const newOrder = {
        _id: String(Date.now()),
        ...req.body,
        createdAt: new Date().toISOString(),
      };
      inMemoryOrders.unshift(newOrder);
      return res.status(201).json(newOrder);
    }
  } catch (err) {
    console.error('Order creation error:', err);
    res.status(500).json({ error: 'Failed to save order' });
  }
});

// GET /api/orders
router.get('/', async (req, res) => {
  try {
    const isDbConnected = mongoose.connection.readyState === 1;

    if (isDbConnected) {
      const orders = await Order.find().sort({ createdAt: -1 });
      return res.json(orders);
    } else {
      return res.json(inMemoryOrders);
    }
  } catch (err) {
    console.error('Order fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

export default router;
