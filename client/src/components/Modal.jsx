import React from "react";
import "../index.css"; 

const Modal = ({ open, title, children, onClose, onConfirm }) => {
  if (!open) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {title && <h2>{title}</h2>}
        <div>{children}</div>
        {/* N'affiche la barre d'action que si onConfirm est défini */}
        {onConfirm && (
          <div className="modal-actions">
            <button className="btn" onClick={onClose}>Annuler</button>
            <button className="btn btn-danger" onClick={onConfirm}>Confirmer</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
