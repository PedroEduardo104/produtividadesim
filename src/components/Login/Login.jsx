import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'; // Seu CSS de Login

// Login agora recebe setIsLoggedIn via props
const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); 

    // --- LOGS DE DEPURACAO ---
    console.log('--- handleLogin Chamado ---');
    console.log('Email digitado (original):', email);
    console.log('Senha digitada (original):', senha);
    console.log('Email digitado (trim):', email.trim());
    console.log('Senha digitada (trim):', senha.trim());
    console.log('Credenciais esperadas - Email: "mrpedroleal@gmail.com", Senha: "123456"');
    // --- FIM DOS LOGS DE DEPURACAO ---

    if (email.trim() === 'mrpedroleal@gmail.com' && senha.trim() === '123456') { 
      alert('Login bem-sucedido!'); // Mensagem de sucesso agora aparece DEPOIS da navegação ser iniciada
      console.log('CONDIÇÃO DE LOGIN: Verdadeira. Logando...');
      setIsLoggedIn(true); // Atualiza o estado de login para TRUE
      navigate('/dashboard'); // Redireciona para o dashboard após o login
    } else {
      console.log('CONDIÇÃO DE LOGIN: Falsa. Exibindo alerta de erro.');
      alert('Email ou senha incorretos.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
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
              placeholder="Sua senha"
              required
            />
          </div>
          <button type="submit" className="botao-login" onClick={handleLogin}>Entrar</button>
        </form>

        <Link to="/cadastro" className="botao-cadastro-link">
          Não tem cadastro? Faça agora.
        </Link>
      </div>
    </div>
  );
};

export default Login;