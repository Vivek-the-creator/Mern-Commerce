import React, { useEffect, useState } from 'react';
import './OrderHistory.css';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useUser();
  const navigate = useNavigate();

useEffect(() => {
  if (!user) {
    navigate('/login');
    return;
  }

  const token = JSON.parse(localStorage.getItem('userInfo'))?.token;

  fetch('http://localhost:5000/api/orders', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error('Failed to fetch orders');
      }
      return res.json();
    })
    .then((data) => setOrders(data))
    .catch((err) => {
      console.error(err);
      alert('Error fetching orders. Please try again.');
    });
}, [user, navigate]);


  return (
    <div className="orders-container">
      <h2>📦 Order History</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="order-card">
            <p><strong>Name:</strong> {order.name}</p>
            <p><strong>Payment:</strong> {order.payment}</p>
            <p><strong>Items:</strong></p>
            <ul>
              {order.items.map((item, idx) => (
                <li key={idx}>
                  {item.name} x {item.qty} = ₹{item.price * item.qty}
                </li>
              ))}
            </ul>
            <p><strong>Total:</strong> ₹{order.total}</p>
            <small>{new Date(order.createdAt).toLocaleString()}</small>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderHistory;
