import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const CartComponent = () => {
  const { cart, addToCart, removeFromCart, updateQuantity } = useContext(CartContext);

  const handleIncreaseQuantity = (itemId) => {
    updateQuantity(itemId, cart[itemId].quantity + 1);
  };

  const handleDecreaseQuantity = (itemId) => {
    if (cart[itemId].quantity > 1) {
      updateQuantity(itemId, cart[itemId].quantity - 1);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      <div>
        {Object.values(cart).map((item) => (
          <div
            key={item._id}
            className="flex justify-between items-center mb-4 p-4 bg-white rounded shadow-md"
          >
            <div>
              <h3 className="font-bold">{item.name}</h3>
              <p>
                ${item.price} x {item.quantity}
              </p>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => handleDecreaseQuantity(item._id)}
                className="bg-yellow-500 p-1 rounded mx-1"
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => handleIncreaseQuantity(item._id)}
                className="bg-yellow-500 p-1 rounded mx-1"
              >
                +
              </button>
              <button
                onClick={() => removeFromCart(item._id)}
                className="text-red-500 ml-4"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartComponent;

