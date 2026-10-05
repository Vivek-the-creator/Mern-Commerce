import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const { cartItems, setCartItems } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    email: '',
    payment: 'cod',
  });

  const [submitted, setSubmitted] = useState(false);

  const total = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        const res = await fetch('http://localhost:5000/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formData,
            items: cartItems,
            total,
          }),
        });

        if (!res.ok) {
          throw new Error('Failed to place order');
        }

        setSubmitted(true);
        setCartItems([]);
      } catch (err) {
        console.error('Checkout error:', err);
        alert('Could not place order. Please make sure backend server is reachable.');
      }
    };


  if (submitted) {
    return (
      <div className="checkout-container">
        <h2>✅ Order Placed Successfully!</h2>
        <p>Thank you, {formData.name}. Your order is on its way 🚚</p>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      <form onSubmit={handleSubmit} className="checkout-form">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          required
          value={formData.name}
          onChange={handleChange}
        />
        <textarea
          name="address"
          placeholder="Address"
          required
          value={formData.address}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={handleChange}
        />

        <label>
          Payment Method:
          <select name="payment" value={formData.payment} onChange={handleChange}>
            <option value="cod">Cash on Delivery</option>
            <option value="card">Card (simulated)</option>
          </select>
        </label>

        <h3>Order Summary</h3>
        <ul>
          {cartItems.map((item) => (
            <li key={item._id}>
              {item.name} x {item.qty} = ₹{item.price * item.qty}
            </li>
          ))}
        </ul>

        <h3>Total: ₹{total}</h3>

        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default CheckoutPage;
