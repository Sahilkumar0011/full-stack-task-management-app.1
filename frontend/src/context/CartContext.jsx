import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Create the context
export const CartContext = createContext();


export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({});

  
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || {};
    setCart(savedCart);
  }, []);

  
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      if (newCart[item._id]) {
        newCart[item._id].quantity += 1;
      } else {
        newCart[item._id] = { ...item, quantity: 1 };
      }
      return newCart;
    });
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      delete newCart[itemId];
      return newCart;
    });
  };

  const updateQuantity = (itemId, quantity) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      if (newCart[itemId]) {
        newCart[itemId].quantity = quantity;
      }
      return newCart;
    });
  };

  const clearCart = () => {
    setCart({});
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};


