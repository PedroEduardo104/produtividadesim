import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulação de login com usuário fixo
    if (email === 'mrpedroleal@gmail.com' && senha === '1234') {
      alert('Login realizado com sucesso!');
      navigate('/dashboard');
    } else {
      alert('E-mail ou senha incorretos.');
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">
        <span className="green">Produtividade</span><span className="blue">SIM</span>
      </h1>
      <p className="login-subtitle">Bem-vindo de volta!</p>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <button type="submit" className="primary-button">Entrar</button>
      </form>
      <button className="secondary-button" onClick={() => navigate('/cadastro')}>Não tem cadastro? Faça agora.</button>
      <p className="about-link" onClick={() => navigate('/sobre')}>Sobre nosso projeto</p>
    </div>
  );
};

export default Login;