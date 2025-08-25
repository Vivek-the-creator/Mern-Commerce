import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js'; // make sure path is correct

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    let { name, email, password } = req.body;
    console.log('📥 Incoming registration:', { name, email });

    // 1️⃣ Basic field validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // 2️⃣ Convert email to lowercase for case-insensitive match
    email = email.toLowerCase();

    // 3️⃣ Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('❌ Email already exists in DB');
      return res.status(400).json({ message: 'Email already exists' });
    }

    // 4️⃣ Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5️⃣ Create new user in DB
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    console.log('✅ User created successfully:', user._id);

    // 6️⃣ Ensure JWT secret exists
    if (!process.env.JWT_SECRET) {
      console.error('🚨 JWT_SECRET is missing in .env file');
      return res.status(500).json({ message: 'Server configuration error' });
    }

    // 7️⃣ Create JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '3d',
    });

    // 8️⃣ Send success response
    return res.status(201).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });

  } catch (err) {
    console.error('🚨 Registration Error:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default router;
