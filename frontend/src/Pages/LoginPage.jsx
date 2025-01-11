import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/loginPage.css'; 

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://food-delivery-system-jfir.onrender.com/api/auth/login', { username, password });
      localStorage.setItem('token', response.data.token);
      navigate('/menu');
    } catch (error) {
      console.error('Login failed', error);
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="login-page-container">
        <h2 className="login-page-title">Login</h2>
        <input 
          type="text" 
          placeholder="Username" 
          className="login-page-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="login-page-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin} className="login-page-button">Login</button>
        <div className="login-page-footer">
          <span>Don't have an account? <a href="/register" className="text-blue-500">Register</a></span>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
