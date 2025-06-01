import React from 'react';
import { Link } from 'react-router-dom'; // IMPORTANTE: Importar Link para navegação
import './Sobre.css'; // Mantenha seu arquivo CSS existente para esta página

const Sobre = () => {
  return (
    <div className="sobre-container">
      <h1>Produtividade Sim</h1>

      <p><strong>Componente Curricular:</strong> PRAT PROF EM ANÁLISE E DESENVOLVIMENTO DE SISTEMAS - 2025.1 - 201825139.000.05A</p>

      <h2>Alunos:</h2>
      <ul className="alunos-lista">
        <li><strong>Jéssica Gomes Cardoso Murgi Novelli</strong> - 10415717</li>
        <li><strong>Pedro Eduardo Alves Pinheiro</strong> - 10415504</li>
        <li><strong>Lucas Cabral Silva</strong> - 10415819</li>
        <li><strong>Pedro Henrique Moreira Leal</strong> - 10408363</li>
        <li><strong>Felipe Messias Rodrigues</strong> - 10415818</li>
      </ul>

      <p>
        Este projeto tem como objetivo ajudar os usuários a organizar suas tarefas de forma intuitiva, moderna e eficiente. Desenvolvido como parte do componente curricular acima, simula um gerenciador de produtividade com foco em usabilidade e design limpo.
      </p>

      <br /> {/* Quebra de linha para espaçamento */}

      {/* Botão para ir para a página de Login */}
      <Link to="/login" style={{
        display: 'inline-block', // Permite aplicar padding e margem como um bloco
        padding: '12px 25px', // Padding interno
        backgroundColor: '#007bff', // Cor de fundo (azul)
        color: 'white', // Cor do texto
        textDecoration: 'none', // Remove sublinhado padrão de link
        borderRadius: '8px', // Bordas arredondadas
        fontSize: '17px', // Tamanho da fonte
        fontWeight: 'bold', // Negrito
        transition: 'background-color 0.3s ease, transform 0.2s ease', // Transição suave ao passar o mouse
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Sombra para profundidade
      }}
      // Efeito de hover (opcional, pode ser feito no CSS da página Sobre)
      onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
      onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
      >
        Ir para Login
      </Link>
    </div>
  );
};

export default Sobre;