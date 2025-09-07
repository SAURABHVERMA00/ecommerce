import React, { createContext, useContext, useState, useEffect } from 'react';
import { getLocalCart, setLocalCart } from '../utils/cartStorage';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(getLocalCart());

  useEffect(() => {
    setLocalCart(cart);
  }, [cart]);

  const addToCart = (item, quantity = 1) => {
    setCart(prev => {
      const found = prev.find(c => c.item._id === item._id);
      if (found) {
        return prev.map(c => c.item._id === item._id ? { ...c, quantity: c.quantity + quantity } : c);
      }
      return [...prev, { item, quantity }];
    });
  };

  const removeFromCart = (itemId) => {
    setCart(prev => prev.filter(c => c.item._id !== itemId));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
