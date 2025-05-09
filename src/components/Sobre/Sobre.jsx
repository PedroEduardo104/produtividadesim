import React from 'react';
import './Sobre.css';

const Sobre = () => {
  return (
    <div className="sobre-container">
      <h1>Produtividade Sim</h1>

      <p><strong>Componente Curricular:</strong> PRAT PROF EM ANÁLISE E DESENVOLVIMENTO DE SISTEMAS - 2025.1 - 201825139.000.05A</p>

      <h2>Alunos:</h2>
      <ul className="alunos-lista">
        <li><strong>Jéssica Gomes Cardoso Murgi Novelli</strong> - RA: 10923019816 – 10415717</li>
        <li><strong>Pedro Eduardo Alves Pinheiro</strong> - RA: 10415504 – TIA: 23016736</li>
        <li><strong>Lucas Cabral Silva</strong> - RA: 10415819</li>
        <li><strong>Pedro Leal</strong> - RA: 10408363</li>
        <li><strong>Felipe Messias Rodrigues</strong> - RA: 10415818</li>
      </ul>

      <p>
        Este projeto tem como objetivo ajudar os usuários a organizar suas tarefas de forma intuitiva, moderna e eficiente. Desenvolvido como parte do componente curricular acima, simula um gerenciador de produtividade com foco em usabilidade e design limpo.
      </p>
    </div>
  );
};

export default Sobre;
