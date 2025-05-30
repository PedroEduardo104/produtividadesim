import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="home-title">
        <span className="green">Produtividade</span><span className="blue">SIM</span>
      </h1>
      <p className="home-subtitle">
        Para descomplicar a sua vida e colocar em prática a tão sonhada produtividade digital!
      </p>
      <button className="primary-button" onClick={() => navigate('/cadastro')}>Fazer seu cadastro</button>
      <button className="secondary-button" onClick={() => navigate('/login')}>Já tem cadastro? Faça seu login.</button>
      <p className="about-link" onClick={() => navigate('/sobre')}>Sobre nosso projeto</p>
    </div>
  );
};

export default Home;