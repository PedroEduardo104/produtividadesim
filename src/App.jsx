import React, { useState } from 'react'; // Importar useState
import Dashboard from './components/Dashboard/Dashboard';
import Home from './components/Home/Home';
import Sobre from './components/Sobre/Sobre';
import Login from './components/Login/Login';
import Cadastro from './components/Cadastro/Cadastro';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Importar Navigate

// Componente para proteger as rotas
const PrivateRoute = ({ children, isLoggedIn }) => {
  return isLoggedIn ? children : <Navigate to="/login" />;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para controlar o login

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* A rota de Login agora recebe setIsLoggedIn */}
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/sobre" element={<Sobre />} />

          {/* Rota do Dashboard é PROTEGIDA */}
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute isLoggedIn={isLoggedIn}>
                {/* O Dashboard agora recebe setIsLoggedIn para o logout */}
                <Dashboard setIsLoggedIn={setIsLoggedIn} />
              </PrivateRoute>
            } 
          />

          {/* Rota padrão para 404 */}
          <Route path="*" element={<div>404 - Página não encontrada</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;