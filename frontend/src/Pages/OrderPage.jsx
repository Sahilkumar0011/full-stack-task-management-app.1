import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../context/CartContext';
import axios from 'axios';
import '../styles/orderPage.css'; // Import the CSS file

const OrderPage = () => {
  const { cart, clearCart } = useContext(CartContext);
  const [orderHistory, setOrderHistory] = useState([]);

  // Handle placing an order
  const handlePlaceOrder = async () => {
  
    const order = {
      items: Object.values(cart).map(item => ({
        menuItemId: item._id, // Assuming _id is the identifier for Menu item
        quantity: item.quantity,
      })),
    };

    try {
      
      const response = await axios.post('https://food-delivery-system-jfir.onrender.com/api/order', order, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // JWT token for authentication
        },
      });
      
      setOrderHistory([response.data, ...orderHistory]); 
      clearCart(); 
    } catch (error) {
      console.error('Failed to place order', error.response?.data || error.message);
    }
  };

  // Calculate total price from cart
  const calculateTotal = () => {
    return Object.values(cart).reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  useEffect(() => {
    
  }, []);

  return (
    <div className="page-container">
      <h2 className="heading">Order Details</h2>
      <div className="cart-summary">
        <h3 className="text-xl font-bold mb-2">Cart Summary</h3>
        {Object.values(cart).map((item) => (
          <div key={item._id} className="cart-item">
            <div>
              <h3>{item.name}</h3>
              <p>Rs.{item.price} x {item.quantity}</p>
            </div>
          </div>
        ))}
        <div className="total-section">
          <p>Total: Rs.{calculateTotal()}</p>
          <button 
            onClick={handlePlaceOrder} 
            className="place-order-btn"
          >
            Place Order
          </button>
        </div>
      </div>

      <div className="order-history">
        <h3 className="text-xl font-bold mb-2">Order History</h3>
        {orderHistory.map((order, index) => (
          <div key={index} className="order-history-item">
            <p className="font-bold">Order #{index + 1}</p>
            {order.items.map((item) => (
              <p key={item.menuItemId}>
                {item.menuItemId.name} - Rs.{item.menuItemId.price} x {item.quantity}
              </p>
            ))}
            <p className="font-bold total">Total: Rs.{order.totalAmount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderPage;


