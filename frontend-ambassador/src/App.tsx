import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter , Route , Routes } from 'react-router-dom'
import { ProductFrontend } from './pages/ProductFrontend';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import Profile from './pages/Profile'
import { Stats } from './pages/Stats';
import { Rankings } from './pages/Rankings';
import { ProductBackend } from './pages/ProductBackend';

function App() {
return (
  <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductFrontend/>} />
        <Route path="/register"  element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/stats' element={<Stats/>} />
        <Route path='/rankings' element={<Rankings/>} />
        <Route path='/backend' element={<ProductBackend/>} />
      </Routes>
    </BrowserRouter>
  </div>
);
}

export default App;