import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { FiEdit3, FiTrash2 } from 'react-icons/fi'; // Ícones de editar e excluir
import { RxDragHandleDots2 } from 'react-icons/rx'; // Ícone de arrastar
import { Link, useNavigate } from 'react-router-dom'; // Importar Link e useNavigate
import './Dashboard.css'; // O CSS deve estar na mesma pasta
import CardDetailsModal from './CardDetailsModal/CardDetailsModal'; 


// O Dashboard agora recebe setIsLoggedIn via props
const Dashboard = ({ setIsLoggedIn }) => { 
  const navigate = useNavigate(); // Hook para navegação programática

  // Estado para armazenar as colunas e seus itens
  const [columns, setColumns] = useState(() => {
    // Tenta carregar as tarefas do localStorage na inicialização
    const savedColumns = localStorage.getItem('tarefas');
    if (savedColumns) {
      // Ao carregar, garanta que cards antigos tenham a nova estrutura
      const loadedColumns = JSON.parse(savedColumns);
      Object.keys(loadedColumns).forEach(colId => {
        loadedColumns[colId].items = loadedColumns[colId].items.map(item => ({
          ...item,
          description: item.description || '',
          dueDate: item.dueDate || null,
          checklist: item.checklist || []
        }));
      });
      return loadedColumns;
    }
    // Se não houver dados salvos, inicializa com colunas padrão
    return {
      aFazer: { id: 'aFazer', name: 'A fazer', items: [] },
      emAndamento: { id: 'emAndamento', name: 'Em andamento', items: [] },
      feito: { id: 'feito', name: 'Concluído', items: [] }
    };
  });

  const [novaTarefa, setNovaTarefa] = useState('');
  const [colunaSelecionada, setColunaSelecionada] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null); // Armazena o card que está no modal
  const [selectedCardColumnId, setSelectedCardColumnId] = useState(null); // Armazena o ID da coluna do card selecionado

  const [newColumnName, setNewColumnName] = useState('');
  const [editingColumnId, setEditingColumnId] = useState(null);
  const [editedColumnName, setEditedColumnName] = useState('');

  useEffect(() => {
    localStorage.setItem('tarefas', JSON.stringify(columns));
  }, [columns]);

  // FUNÇÃO DE LOGOUT
  const handleLogout = () => {
    setIsLoggedIn(false); // <--- ATUALIZA O ESTADO DE LOGIN PARA FALSE
    navigate('/'); // Redireciona para a Home (ou Login) após o logout
  };

  // Funções para Gerenciamento de Tarefas

  // Abre a caixa de adição de nova tarefa em uma coluna específica
  const handleAdicionar = (colunaId) => {
    setColunaSelecionada(colunaId);
    setNovaTarefa(''); // Limpa o campo de input
  };

  // Salva a nova tarefa na coluna selecionada
  const handleSalvar = () => {
    if (novaTarefa.trim()) {
      const nova = { 
        id: Date.now().toString(), 
        content: novaTarefa.trim(),
        description: '', // Novas propriedades padrão
        dueDate: null,
        checklist: []
      }; 
      setColumns(prev => ({
        ...prev,
        [colunaSelecionada]: {
          ...prev[colunaSelecionada],
          items: [...prev[colunaSelecionada].items, nova]
        }
      }));
    }
    setNovaTarefa('');
    setColunaSelecionada(''); // Esconde a caixa de adição
  };

  // ABRE O MODAL DE DETALHES DO CARD (Substitui a edição inline)
  const handleOpenCardDetails = (card, columnId) => {
    setSelectedCard(card);
    setSelectedCardColumnId(columnId);
    setIsModalOpen(true);
  };

  // FECHA O MODAL
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCard(null);
    setSelectedCardColumnId(null);
  };

  // FUNÇÃO PARA ATUALIZAR UM CARD A PARTIR DO MODAL
  const handleUpdateCardDetails = (updatedCard) => {
    setColumns(prev => {
      const newColumns = { ...prev };
      const columnToUpdate = newColumns[selectedCardColumnId];
      if (columnToUpdate) {
        columnToUpdate.items = columnToUpdate.items.map(item =>
          item.id === updatedCard.id ? updatedCard : item
        );
      }
      return newColumns;
    });
    // Opcional: fechar modal após salvar, ou deixar aberto
    // handleCloseModal();
  };

  // Exclui uma tarefa (mantida, mas pode ser chamada do modal também)
  const handleExcluir = (colunaId, index) => {
    setColumns(prev => {
      const novasColunas = { ...prev };
      const itemsDaColuna = [...novasColunas[colunaId].items];
      itemsDaColuna.splice(index, 1); // Remove o item
      novasColunas[colunaId] = { // CORRIGIDO: usa colunaId
        ...novasColunas[colunaId],
        items: itemsDaColuna
      };
      return novasColunas;
    });
    handleCloseModal(); // Fecha o modal se o card excluído era o que estava aberto
  };

  // Funções para Gerenciamento de Colunas (sem alterações aqui)
  const handleAddColumn = () => { 
    if (newColumnName.trim()) {
      const newId = `col-${Date.now()}`; // ID único para a nova coluna
      setColumns(prev => ({
        ...prev,
        [newId]: { id: newId, name: newColumnName.trim(), items: [] }
      }));
      setNewColumnName(''); // Limpa o input
    }
  };
  const startRenamingColumn = (colId, currentName) => { 
    setEditingColumnId(colId);
    setEditedColumnName(currentName);
  };
  const handleRenameColumn = (colId) => { 
    if (editedColumnName.trim()) {
      setColumns(prev => ({
        ...prev,
        [colId]: {
          ...prev[colId],
          name: editedColumnName.trim()
        }
      }));
      setEditingColumnId(null); // Sai do modo de edição
      setEditedColumnName(''); // Limpa o input
    }
  };
  const handleDeleteColumn = (colId) => { 
    if (window.confirm("Tem certeza que deseja excluir esta coluna e todas as suas tarefas?")) {
      setColumns(prev => {
        const newColumns = { ...prev };
        delete newColumns[colId]; // Remove a coluna do objeto
        return newColumns;
      });
      // Reseta estados se a coluna excluída estava sendo usada
      if (colunaSelecionada === colId) {
        setColunaSelecionada('');
      }
      if (editingColumnId === colId) {
        setEditingColumnId(null);
      }
      // Se alguma tarefa na coluna excluída estava em edição
      if (editando.coluna === colId) {
        setEditando({ coluna: '', index: null });
      }
    }
  };

  // Função principal para lidar com o fim do arrastar e soltar (APENAS CARDS)
  const onDragEnd = (result) => {
    const { source, destination } = result; // Removido 'type' pois não é usado aqui

    // Se não soltou em um destino válido
    if (!destination) {
      return;
    }

    // Se arrastou e soltou no mesmo lugar
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    // Lógica para TAREFAS (refatorada para ser mais robusta)
    setColumns(prev => {
      const newColumns = { ...prev }; // Cria uma cópia rasa do objeto de colunas

      const sourceColId = source.droppableId;
      const destColId = destination.droppableId;

      // Cria cópias dos arrays de itens das colunas de origem e destino
      const sourceItems = Array.from(newColumns[sourceColId].items); 
      const destItems = Array.from(newColumns[destColId].items);

      const [movedTask] = sourceItems.splice(source.index, 1); // Remove o item da lista de origem

      if (sourceColId === destColId) {
        // Arrastou dentro da mesma coluna
        sourceItems.splice(destination.index, 0, movedTask);
        newColumns[sourceColId] = {
          ...newColumns[sourceColId], // Copia as propriedades existentes da coluna de origem
          items: sourceItems // Atualiza o array de itens na cópia da coluna
        };
      } else {
        // Arrastou para uma coluna diferente
        destItems.splice(destination.index, 0, movedTask);
        newColumns[sourceColId] = {
          ...newColumns[sourceColId],
          items: sourceItems
        };
        newColumns[destColId] = {
          ...newColumns[destColId],
          items: destItems
        };
      }
      return newColumns; // Retorna o novo objeto de colunas atualizado
    });
  };

  return (
    <div className="dashboard-container">
      <header className="header">
        <h1>
          <span className="verde">Produtividade</span>
          <span className="azul">SIM</span> - <i>Dashboard</i>
        </h1>
        <div className="links-dashboard">
          {/* Usando Link do react-router-dom para navegação interna */}
          <Link to="/sobre" className="link-dashboard">Sobre nosso projeto</Link>
          <span className="separator">|</span>
          {/* Botão Sair agora chama handleLogout */}
          <button onClick={handleLogout} className="link-dashboard-button">Sair</button> 
        </div>
      </header>

      <DragDropContext onDragEnd={onDragEnd}>
        {/* O container 'quadro' NÃO É MAIS um Droppable para colunas */}
        <div className="quadro">
          {/* Itera sobre os IDs das colunas para renderizá-las */}
          {Object.keys(columns).map((colId) => { 
            const colData = columns[colId];

            return (
              // COLUNA: NÃO É MAIS UM DRAGGABLE
              // Apenas o div da coluna, sem providedColumnDraggable props ou ref
              <div
                key={colId} // Mantenha a key
                className="coluna"
              >
                {/* O topo da coluna NÃO É MAIS uma alça de arrasto para a coluna */}
                <div className="coluna-topo">
                  {editingColumnId === colId ? (
                    // Modo de edição do nome da coluna
                    <div className="edicao-coluna-box">
                      <input
                        type="text"
                        value={editedColumnName}
                        onChange={(e) => setEditedColumnName(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') handleRenameColumn(colId);
                        }}
                        autoFocus
                      />
                      <button onClick={() => handleRenameColumn(colId)} className="botao-salvar-coluna">Salvar</button>
                    </div>
                  ) : (
                    // Visualização normal do nome da coluna e suas ações
                    <>
                      <h2>{colData.name}</h2>
                      <div className="coluna-acoes">
                        <FiEdit3
                          onClick={() => startRenamingColumn(colId, colData.name)}
                          className="icone-editar-coluna"
                          title="Renomear coluna"
                        />
                        <FiTrash2
                          onClick={() => handleDeleteColumn(colId)}
                          className="icone-excluir-coluna"
                          title="Excluir coluna"
                        />
                        <button className="botao-add" onClick={() => handleAdicionar(colId)}>+</button>
                      </div>
                    </>
                  )}
                </div>

                {/* Droppable para os ITENS (tarefas) dentro desta coluna */}
                <Droppable droppableId={colId} type="task">
                  {(providedItemDroppable) => (
                    <div
                      className="coluna-conteudo-items"
                      ref={providedItemDroppable.innerRef}
                      {...providedItemDroppable.droppableProps}
                    >
                      {colunaSelecionada === colId && (
                        <div className="nova-tarefa-box">
                          <input
                            type="text"
                            value={novaTarefa}
                            onChange={(e) => setNovaTarefa(e.target.value)}
                            placeholder="Nova tarefa"
                            autoFocus
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') handleSalvar();
                            }}
                          />
                          <button className="botao-salvar" onClick={handleSalvar}>Salvar</button>
                        </div>
                      )}

                      {/* MENSAGEM DE COLUNA VAZIA */}
                      {colData.items.length === 0 && colunaSelecionada !== colId && (
                        <div className="coluna-vazia-mensagem">
                            Nenhuma tarefa aqui. Arraste uma para cá ou clique em '+' para adicionar.
                        </div>
                      )}

                      {colData.items.map((item, itemIndex) => (
                        // Draggable para CADA TAREFA
                        <Draggable key={item.id} draggableId={item.id} index={itemIndex}>
                          {(provided, snapshot) => ( 
                            <div
                              className={`card ${snapshot.isDragging ? 'is-dragging' : ''}`} 
                              ref={provided.innerRef}
                              {...provided.draggableProps} 
                              {...provided.dragHandleProps} // FAZ O CARD INTEIRO SER A ALÇA (como na versão que funcionou)
                              onClick={(e) => { // ABRIR MODAL AO CLICAR NO CARD (exclui o drag handle para não conflitar)
                                if (provided.dragHandleProps && e.target.closest('[data-rbd-drag-handle]')) {
                                  // Se o clique veio da alça de arrasto, não abra o modal
                                  return;
                                }
                                handleOpenCardDetails(item, colId);
                              }}
                              style={{
                                ...provided.draggableProps.style,
                                boxShadow: snapshot.isDragging ? '0 8px 16px rgba(0,0,0,0.2)' : '0 1px 0 rgba(9,30,66,.25)',
                                backgroundColor: snapshot.isDragging ? '#f4f5f7' : 'white', 
                              }}
                            >
                              {/* REMOVIDA A EDIÇÃO INLINE. TUDO SERÁ FEITO NO MODAL */}
                              <div className="card-conteudo">
                                <span>{item.content}</span>
                                <div className="icones-card">
                                  {/* ÍCONE DE ARRASTAR DO CARD: APENAS VISUAL. O ARRASTO FUNCIONAL ESTÁ NO PAI */}
                                  <span title="Arrastar tarefa" style={{ cursor: 'grab' }}> 
                                    <RxDragHandleDots2 className="icone-arrastar" />
                                  </span>
                                  {/* O ícone de edição FiEdit3 será usado para abrir o modal também, se quiser um botão dedicado */}
                                  {/* <FiEdit3 onClick={() => handleOpenCardDetails(item, colId)} className="icone-editar" title="Editar tarefa" /> */}
                                  <FiTrash2 onClick={() => handleExcluir(colId, itemIndex)} className="icone-excluir" title="Excluir tarefa" />
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {providedItemDroppable.placeholder} {/* Placeholder para tarefas arrastadas */}
                    </div>
                  )}
                </Droppable>
                
                {/* BOTÃO "ADICIONAR OUTRO CARTÃO" NA BASE DA COLUNA */}
                {colunaSelecionada !== colId && ( // Esconde se o input de nova tarefa já estiver aberto
                    <button className="botao-adicionar-card-base" onClick={() => handleAdicionar(colId)}>
                        Adicionar outro cartão
                    </button>
                )}
              </div>
            );
          })}

          {/* Box para Adicionar Nova Coluna */}
          <div className="adicionar-coluna-box">
            <input
              type="text"
              placeholder="Nome da nova coluna"
              value={newColumnName}
              onChange={(e) => setNewColumnName(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') handleAddColumn();
              }}
            />
            <button onClick={handleAddColumn} className="botao-add-coluna">Adicionar Coluna</button>
          </div>

        </div> {/* Fim do div.quadro */}
      </DragDropContext>

      {/* MODAL DE DETALHES DO CARD */}
      {isModalOpen && selectedCard && (
        <CardDetailsModal
          card={selectedCard}
          columnId={selectedCardColumnId}
          onClose={handleCloseModal}
          onSave={handleUpdateCardDetails}
          onDelete={() => handleExcluir(selectedCardColumnId, columns[selectedCardColumnId].items.indexOf(selectedCard))}
        />
      )}
    </div>
  );
};

export default Dashboard;