import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import MenuItem from '../components/MenuItem';
import '../styles/menuPage.css';

const MenuPage = () => {
  const [menu, setMenu] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', category: '', price: '', availability: true });
  const { addToCart } = useContext(CartContext);

  const fetchMenu = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://food-delivery-system-jfir.onrender.com/api/menu', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMenu(response.data);
    } catch (error) {
      console.error('Error fetching menu:', error);
    }
  };

  const handleAddMenuItem = async () => {
    if (!newItem.name || !newItem.category || !newItem.price) {
      alert('Please fill in all fields!');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      await axios.post('https://food-delivery-system-jfir.onrender.com/api/menu', newItem, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchMenu();
    } catch (error) {
      console.error('Error adding menu item:', error.response ? error.response.data : error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  return (
    <div className="menu-page-container">
      <div className="menu-page-header">
        <h2 className="menu-page-title">Menu</h2>
        <button 
          onClick={handleAddMenuItem} 
          className="menu-page-add-button"
        >
          Add Menu Item
        </button>
      </div>

      <div className="menu-page-form mb-4">
        <input 
          type="text" 
          name="name" 
          value={newItem.name} 
          onChange={handleInputChange} 
          placeholder="Item Name"
        />
        <input 
          type="text" 
          name="category" 
          value={newItem.category} 
          onChange={handleInputChange} 
          placeholder="Category"
        />
        <input 
          type="number" 
          name="price" 
          value={newItem.price} 
          onChange={handleInputChange} 
          placeholder="Price"
        />
        <button onClick={handleAddMenuItem} className="menu-page-add-button">
          Save Item
        </button>
      </div>

      <div className="grid">
        {menu.map((item) => (
          <MenuItem 
            key={item._id} 
            item={item} 
            fetchMenu={fetchMenu}
            addToCart={addToCart} 
          />
        ))}
      </div>

      <Link to="/orders" className="menu-page-orders-link">Go to Orders</Link>
    </div>
  );
};

export default MenuPage;





