import React, { useState, useEffect } from 'react';
import './CardDetailsModal.css'; // CSS para o modal

const CardDetailsModal = ({ card, columnId, onClose, onSave, onDelete }) => {
  const [currentCard, setCurrentCard] = useState(card);
  const [newChecklistItem, setNewChecklistItem] = useState('');

  useEffect(() => {
    setCurrentCard(card); // Atualiza o estado interno do modal se o card mudar (ex: fora do modal)
  }, [card]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentCard(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (e) => {
    setCurrentCard(prev => ({ ...prev, dueDate: e.target.value }));
  };

  const handleChecklistChange = (id) => {
    setCurrentCard(prev => ({
      ...prev,
      checklist: prev.checklist.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    }));
  };

  const handleAddChecklistItem = () => {
    if (newChecklistItem.trim()) {
      setCurrentCard(prev => ({
        ...prev,
        checklist: [
          ...prev.checklist,
          { id: Date.now().toString(), text: newChecklistItem.trim(), completed: false }
        ]
      }));
      setNewChecklistItem('');
    }
  };

  const handleDeleteChecklistItem = (id) => {
    setCurrentCard(prev => ({
      ...prev,
      checklist: prev.checklist.filter(item => item.id !== id)
    }));
  };

  const handleSaveAndClose = () => {
    onSave(currentCard);
    onClose();
  };

  const handleDeleteAndClose = () => {
    onDelete(); // onExcluir já lida com o fechamento do modal no Dashboard.jsx
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}> {/* Impede o clique no overlay de fechar */}
        <div className="modal-header">
          <h3>{currentCard.content}</h3>
          <button className="modal-close-button" onClick={onClose}>&times;</button>
        </div>

        <div className="modal-body">
          <div className="modal-section">
            <h4>Título do Card</h4>
            <input
              type="text"
              name="content"
              value={currentCard.content}
              onChange={handleChange}
              className="modal-input"
            />
          </div>

          <div className="modal-section">
            <h4>Descrição</h4>
            <textarea
              name="description"
              value={currentCard.description}
              onChange={handleChange}
              placeholder="Adicione uma descrição mais detalhada..."
              className="modal-textarea"
            ></textarea>
          </div>

          <div className="modal-section">
            <h4>Data de Vencimento</h4>
            <input
              type="date"
              name="dueDate"
              value={currentCard.dueDate || ''} // Garante que é uma string para o input type="date"
              onChange={handleDateChange}
              className="modal-input"
            />
          </div>

          <div className="modal-section">
            <h4>Checklist</h4>
            <div className="checklist">
              {currentCard.checklist.map(item => (
                <div key={item.id} className="checklist-item">
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => handleChecklistChange(item.id)}
                  />
                  <span className={item.completed ? 'completed' : ''}>{item.text}</span>
                  <button onClick={() => handleDeleteChecklistItem(item.id)} className="delete-checklist-item-button">
                    &times;
                  </button>
                </div>
              ))}
              <div className="add-checklist-item">
                <input
                  type="text"
                  value={newChecklistItem}
                  onChange={(e) => setNewChecklistItem(e.target.value)}
                  placeholder="Adicionar item ao checklist"
                  onKeyPress={(e) => { if (e.key === 'Enter') handleAddChecklistItem(); }}
                />
                <button onClick={handleAddChecklistItem} className="add-item-button">+</button>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button onClick={handleSaveAndClose} className="modal-save-button">Salvar</button>
          <button onClick={handleDeleteAndClose} className="modal-delete-button">Excluir Card</button>
        </div>
      </div>
    </div>
  );
};

export default CardDetailsModal;