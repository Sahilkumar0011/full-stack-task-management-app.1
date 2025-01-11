import React, { useState } from 'react';
import axios from 'axios';

const MenuItem = ({ item, fetchMenu, addToCart }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedItem, setEditedItem] = useState(item);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://food-delivery-system-jfir.onrender.com/api/menu/${item._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchMenu();
    } catch (error) {
      console.error('Error deleting menu item:', error);
    }
  }

  const handleEdit = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`https://food-delivery-system-jfir.onrender.com/api/menu/${item._id}`, editedItem, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setIsEditing(false);
      fetchMenu();
    } catch (error) {
      console.error('Error updating menu item:', error);
    }
  }

  return (
    <div className="bg-white p-4 border rounded shadow-md">
      {isEditing ? (
        <div>
          <input 
            type="text" 
            value={editedItem.name} 
            onChange={(e) => setEditedItem({ ...editedItem, name: e.target.value })}
            className="w-full p-2 mb-2"
          />
          <input 
            type="text" 
            value={editedItem.category} 
            onChange={(e) => setEditedItem({ ...editedItem, category: e.target.value })}
            className="w-full p-2 mb-2"
          />
          <input 
            type="number" 
            value={editedItem.price} 
            onChange={(e) => setEditedItem({ ...editedItem, price: e.target.value })}
            className="w-full p-2 mb-2"
          />
          <button 
            onClick={handleEdit} 
            style={{
              backgroundColor: '#6a0dad',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '8px',
              fontWeight: 'bold',
              width: '100%',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#7b1fa2'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#6a0dad'}
          >
            Save
          </button>
        </div>
      ) : (
        <div>
          <h3 className="font-bold">{item.name}</h3>
          <p>{item.category}</p>
          <p>Rs.{item.price}</p>
          <button 
            onClick={() => setIsEditing(true)} 
            style={{
              backgroundColor: '#6a0dad',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginRight: '10px',
              transition: 'background-color 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#7b1fa2'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#6a0dad'}
          >
            Edit
          </button>
          <button 
            onClick={handleDelete} 
            style={{
              backgroundColor: '#ff1744',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#d50032'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#ff1744'}
          >
            Delete
          </button>
          
          <button 
            onClick={() => addToCart(item)} 
            style={{
              backgroundColor: '#9c27b0',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '8px',
              fontWeight: 'bold',
              width: '100%',
              marginTop: '10px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#ab47bc'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#9c27b0'}
          >
            Add to Cart
          </button>
        </div>
      )}
    </div>
  );
}

export default MenuItem;



