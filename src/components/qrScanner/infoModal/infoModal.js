import React from "react";
import "./infoModal.css";

export function InfoModal(props) {
  const { isOpen, onClick, text } = props;

  if (!isOpen) return null;

  return (
    <div className="infoModalWrapper">
      <div className="infoModalContainer">
        <p className="infoModalText">{text}</p>
        <button onClick={onClick} className="infoModalButton">
          OK
        </button>
      </div>
    </div>
  );
}
