// backend/config/db.js
import mongoose from 'mongoose';

// Disable command buffering so Mongoose never hangs queries for 10s when DB is offline
mongoose.set('bufferCommands', false);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 2000,
    });
    console.log('MongoDB connected!');
  } catch (error) {
    console.warn(`MongoDB Connection Warning: ${error.message}`);
    console.warn('Backend is running in fallback mode with in-memory persistence.');
  }
};

export default connectDB;
