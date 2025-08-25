import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => {
    const exists = cartItems.find((item) => item._id === product._id);
    if (exists) {
        if (product.qty === -1) {
        setCartItems(cartItems.map(item =>
            item._id === product._id ? { ...item, qty: item.qty - 1 } : item
        ));
        } else {
        setCartItems(cartItems.map(item =>
            item._id === product._id ? { ...item, qty: item.qty + 1 } : item
        ));
        }
    } else {
        setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
    };



  const removeFromCart = (id) => {
    setCartItems(cartItems.filter(item => item._id !== id));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
