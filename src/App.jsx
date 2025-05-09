import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './components/Home/Home';
import Cadastro from './components/Cadastro/Cadastro';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Sobre from './components/Sobre/Sobre';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/sobre" element={<Sobre />} />
    </Routes>
  );
}

export default App;
