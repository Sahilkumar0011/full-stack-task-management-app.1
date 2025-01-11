import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  
import { CartProvider } from './context/CartContext';
import Header from './components/Header';  
import Footer from './components/Footer';  
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import MenuPage from './Pages/MenuPage';
import OrderPage from './Pages/OrderPage';

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<RegisterPage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/orders" element={<OrderPage />} />
        </Routes>
        <Footer />
      </Router>
    </CartProvider>
  );
};

export default App;

