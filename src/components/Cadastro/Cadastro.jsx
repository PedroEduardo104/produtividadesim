import React, { useState } from 'react';
import './Cadastro.css';
import { useNavigate } from 'react-router-dom';

const Cadastro = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmacaoSenha: ''
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulação de envio (aqui você pode colocar lógica futura)
    alert('Cadastro realizado com sucesso!');
  };

  return (
    <div className="cadastro-container">
      <h1 className="cadastro-title">
        <span className="green">Produtividade</span><span className="blue">SIM</span>
      </h1>
      <form className="cadastro-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={formData.nome}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Seu melhor e-mail"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="senha"
          placeholder="Senha"
          value={formData.senha}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmacaoSenha"
          placeholder="Confirmação da senha"
          value={formData.confirmacaoSenha}
          onChange={handleChange}
          required
        />
        <button type="submit" className="primary-button">Confirmar cadastro</button>
      </form>
      <button className="secondary-button" onClick={() => navigate('/login')}>Já tem cadastro? Faça seu login.</button>
      <p className="about-link" onClick={() => navigate('/sobre')}>Sobre nosso projeto</p>
    </div>
  );
};

export default Cadastro;