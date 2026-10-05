// routes/userRoutes.js
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../models/userModel.js';

const router = express.Router();

// In-memory fallback store when MongoDB is offline
const inMemoryUsers = [];

// Helper to generate JWT and format response user object
const generateAuthResponse = (userDoc, message, statusRes = 200) => {
  const token = jwt.sign(
    { id: userDoc._id },
    process.env.JWT_SECRET || 'secret_key_123',
    { expiresIn: '1d' }
  );

  const userObj = {
    _id: userDoc._id,
    name: userDoc.name,
    email: userDoc.email,
    token,
  };

  return {
    status: statusRes,
    data: {
      message,
      token,
      user: userObj,
    },
  };
};

// 📝 Register user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please fill in all fields' });
    }

    const isDbConnected = mongoose.connection.readyState === 1;

    if (isDbConnected) {
      // Check if user exists in MongoDB
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
      });

      const { status, data } = generateAuthResponse(newUser, 'User registered successfully', 201);
      return res.status(status).json(data);
    } else {
      // In-memory fallback mode
      const existingUser = inMemoryUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = {
        _id: String(Date.now()),
        name,
        email,
        password: hashedPassword,
      };
      inMemoryUsers.push(newUser);

      const { status, data } = generateAuthResponse(newUser, 'User registered successfully', 201);
      return res.status(status).json(data);
    }
  } catch (err) {
    console.error('Register route error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// 🔐 Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const isDbConnected = mongoose.connection.readyState === 1;

    if (isDbConnected) {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      const { status, data } = generateAuthResponse(user, 'Login successful', 200);
      return res.status(status).json(data);
    } else {
      // In-memory fallback mode
      const user = inMemoryUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      const { status, data } = generateAuthResponse(user, 'Login successful', 200);
      return res.status(status).json(data);
    }
  } catch (err) {
    console.error('Login route error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default router;
