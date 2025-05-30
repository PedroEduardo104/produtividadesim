import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { FiEdit3, FiTrash2 } from 'react-icons/fi';
import { RxDragHandleDots2 } from 'react-icons/rx';
import './Dashboard.css';

const Dashboard = () => {
  const [columns, setColumns] = useState({
    aFazer: { name: 'A fazer', items: [] },
    emAndamento: { name: 'Em andamento', items: [] },
    feito: { name: 'Feito', items: [] }
  });

  const [novaTarefa, setNovaTarefa] = useState('');
  const [colunaSelecionada, setColunaSelecionada] = useState('');
  const [editando, setEditando] = useState({ coluna: '', index: null });
  const [textoEditado, setTextoEditado] = useState('');

  useEffect(() => {
    const data = localStorage.getItem('tarefas');
    if (data) setColumns(JSON.parse(data));
  }, []);

  useEffect(() => {
    localStorage.setItem('tarefas', JSON.stringify(columns));
  }, [columns]);

  const handleAdicionar = (colunaId) => {
    setColunaSelecionada(colunaId);
    setNovaTarefa('');
  };

  const handleSalvar = () => {
    if (novaTarefa.trim()) {
      const nova = { id: Date.now().toString(), content: novaTarefa };
      setColumns(prev => ({
        ...prev,
        [colunaSelecionada]: {
          ...prev[colunaSelecionada],
          items: [...prev[colunaSelecionada].items, nova]
        }
      }));
    }
    setNovaTarefa('');
    setColunaSelecionada('');
  };

  const handleEditar = (coluna, index) => {
    setEditando({ coluna, index });
    setTextoEditado(columns[coluna].items[index].content);
  };

  const handleSalvarEdicao = () => {
    const novas = [...columns[editando.coluna].items];
    novas[editando.index].content = textoEditado;
    setColumns(prev => ({
      ...prev,
      [editando.coluna]: {
        ...prev[editando.coluna],
        items: novas
      }
    }));
    setEditando({ coluna: '', index: null });
    setTextoEditado('');
  };

  const handleExcluir = (coluna, index) => {
    const novas = [...columns[coluna].items];
    novas.splice(index, 1);
    setColumns(prev => ({
      ...prev,
      [coluna]: {
        ...prev[coluna],
        items: novas
      }
    }));
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceCol = columns[source.droppableId];
    const destCol = columns[destination.droppableId];
    const sourceItems = [...sourceCol.items];
    const destItems = [...destCol.items];
    const [moved] = sourceItems.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceItems.splice(destination.index, 0, moved);
      setColumns(prev => ({
        ...prev,
        [source.droppableId]: {
          ...sourceCol,
          items: sourceItems
        }
      }));
    } else {
      destItems.splice(destination.index, 0, moved);
      setColumns(prev => ({
        ...prev,
        [source.droppableId]: {
          ...sourceCol,
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destCol,
          items: destItems
        }
      }));
    }
  };

  return (
    <div className="dashboard-container">
      <header className="header">
        <h1>
          <span className="verde">Produtividade</span>
          <span className="azul">SIM</span> - <i>Dashboard</i>
        </h1>
        <div className="links-dashboard">
          <a href="/sobre" className="link-dashboard">Sobre nosso projeto</a>
          <span className="separator">|</span>
          <a href="/" className="link-dashboard">Sair</a>
        </div>
      </header>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="quadro">
          {Object.entries(columns).map(([colId, colData]) => (
            <Droppable droppableId={colId} key={colId}>
              {(provided) => (
                <div className="coluna" ref={provided.innerRef} {...provided.droppableProps}>
                  <div className="coluna-topo">
                    <h2>{colData.name}</h2>
                    <button className="botao-add" onClick={() => handleAdicionar(colId)}>+</button>
                  </div>

                  {colunaSelecionada === colId && (
                    <div className="nova-tarefa-box">
                      <input
                        type="text"
                        value={novaTarefa}
                        onChange={(e) => setNovaTarefa(e.target.value)}
                        placeholder="Nova tarefa"
                      />
                      <button className="botao-salvar" onClick={handleSalvar}>Salvar</button>
                    </div>
                  )}

                  {colData.items.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided) => (
                        <div
                          className="card"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          style={{ ...provided.draggableProps.style }}
                        >
                          {editando.coluna === colId && editando.index === index ? (
                            <div className="edicao-box">
                              <input
                                value={textoEditado}
                                onChange={(e) => setTextoEditado(e.target.value)}
                              />
                              <button className="botao-salvar" onClick={handleSalvarEdicao}>Salvar</button>
                            </div>
                          ) : (
                            <div className="card-conteudo">
                              <span>{item.content}</span>
                              <div className="icones-card">
                                <FiEdit3 onClick={() => handleEditar(colId, index)} className="icone-editar" />
                                <FiTrash2 onClick={() => handleExcluir(colId, index)} className="icone-excluir" />
                                <span {...provided.dragHandleProps}>
                                  <RxDragHandleDots2 className="icone-arrastar" />
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Dashboard;
