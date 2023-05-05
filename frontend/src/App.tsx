import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Users from './pages/Users';
import Login from './pages/Login';
import Register from './pages/Register';
import { ListUsers } from './pages/ListUsers';
import { Link } from './pages/Link';
import { Products } from './pages/Products';
import { ProductsCreate } from './pages/ProductsCreate';
import { Orders } from './pages/Orders';
import Profile from './pages/Profile';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<ListUsers/>} />
        <Route path="/users" element={<Users/>} />
        <Route path='/user/:id/link' element={<Link/>} />
        <Route path="/login" element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/products' element={<Products/>}/>
        <Route path='/product/create' element={<ProductsCreate/>}/>
        <Route path='/product/edit/:id' element={<ProductsCreate/>}/>
        <Route path='/orders' element={<Orders/>}/>
        <Route path='/profile' element={<Profile/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
