import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  name: String,
  address: String,
  email: String,
  payment: String,
  items: [
    {
      _id: String,
      name: String,
      qty: Number,
      price: Number,
    },
  ],
  total: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model('Order', orderSchema);
export default Order;
