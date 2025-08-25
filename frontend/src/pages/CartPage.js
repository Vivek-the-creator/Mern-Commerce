import React from 'react';
import { useCart } from '../context/CartContext';
import './CartPage.css';
import { Link } from 'react-router-dom';


const CartPage = () => {
  const { cartItems, addToCart, removeFromCart } = useCart();

  const decreaseQty = (product) => {
    if (product.qty === 1) {
      removeFromCart(product._id);
    } else {
      addToCart({ ...product, qty: -1 });
    }
  };

  const getTotal = () =>
    cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="cart-container">
      <h2>🛒 Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty 😔</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item._id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="cart-info">
                <h3>{item.name}</h3>
                <p>₹{item.price}</p>
                <div className="qty-buttons">
                  <button onClick={() => decreaseQty(item)}>-</button>
                  <span>{item.qty}</span>
                  <button onClick={() => addToCart(item)}>+</button>
                </div>
                <button className="remove-btn" onClick={() => removeFromCart(item._id)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
          <h3 className="total">Total: ₹{getTotal()}</h3>
          <Link to="/checkout">
            <button className="btn">Proceed to Checkout</button>
        </Link>

        </>
      )}
    </div>
  );
};

export default CartPage;
