import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/registerPage.css'; 

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); 
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await axios.post('https://food-delivery-system-jfir.onrender.com/api/auth/register', { username, password });
      
      
      if (response.status === 201) {
        navigate('/login');
      }
    } catch (error) {
      console.error('Registration failed', error);
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false); 
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="register-page-container">
        <h2 className="register-page-title">Register</h2>

        {error && <div className="register-page-error">{error}</div>}

        <input 
          type="text" 
          placeholder="Username" 
          className="register-page-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="register-page-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <button 
          onClick={handleRegister} 
          className="register-page-button"
          disabled={loading} 
        >
          {loading ? 'Registering...' : 'Register'}
        </button>

        <div className="mt-4 text-center">
          <span>Already have an account? <a href="/login" className="register-page-login-link">Login</a></span>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;

