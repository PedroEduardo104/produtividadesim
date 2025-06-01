import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Cadastro.css'; // Seu CSS de Cadastro

const Cadastro = () => {
  const [nome, setNome] = useState(''); // Para o nome completo/usuário
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const navigate = useNavigate();

  const handleCadastro = (e) => {
    e.preventDefault(); // Impede o recarregamento da página

    // Validações básicas
    if (!nome.trim() || !email.trim() || !senha.trim() || !confirmarSenha.trim()) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
    if (senha !== confirmarSenha) {
      alert('As senhas não coincidem.');
      return;
    }
    if (senha.length < 6) {
      alert('A senha deve ter pelo menos 6 caracteres.');
      return;
    }
    // Adicione validação de e-mail mais robusta se quiser

    // Lógica de cadastro (por enquanto, apenas um alerta e navegação)
    // Em uma aplicação real, você faria uma requisição para um backend aqui.
    alert('Cadastro realizado com sucesso! Agora faça login com sua nova conta.');
    console.log('Nome:', nome, 'Email:', email, 'Senha:', senha);

    // Redireciona para a página de login após o cadastro
    navigate('/login');
  };

  return (
    <div className="cadastro-container">
      <div className="cadastro-box">
        <h2>Cadastro</h2> {/* Título alterado para "Cadastro" */}
        <form onSubmit={handleCadastro}>
          <div className="input-group">
            <label htmlFor="nome">Nome Completo</label> {/* Rótulo alterado */}
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Seu nome completo"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seuemail@exemplo.com"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Mínimo 6 caracteres"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="confirmarSenha">Confirme a Senha</label> {/* Nova linha */}
            <input
              type="password"
              id="confirmarSenha"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              placeholder="Confirme sua senha"
              required
            />
          </div>
          <button type="submit" className="botao-criar-conta">Criar Conta</button> {/* Texto do botão alterado */}
        </form>

        {/* Link para a página de login, estilizado como o botão da imagem */}
        <Link to="/login" className="link-ja-tem-conta"> {/* Nova classe para estilização */}
          Já tem conta? Entre aqui. {/* Texto do link alterado */}
        </Link>
      </div>
    </div>
  );
};

export default Cadastro;