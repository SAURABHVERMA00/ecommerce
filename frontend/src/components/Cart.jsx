import React from 'react';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cart, removeFromCart } = useCart();

  return (
    <div>
      <h2>Cart</h2>
      <div className="cart-list">
        {cart.length === 0 ? <div className="empty">Cart is empty</div> : (
          cart.map(({ item, quantity }) => (
            <div className="cart-item" key={item._id}>
              <span className="cart-title">{item.name}</span>
              <span className="cart-qty">x {quantity}</span>
              <span className="product-price">${item.price * quantity}</span>
              <button className="remove-btn" onClick={() => removeFromCart(item._id)}>Remove</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
