import React from "react";
import s from './modal.module.css'

const Modal = ({children, closeModal}) => {
  return (
    <div className={s.Overlay} onClick={closeModal}>
      <div className={s.Modal}>
        {children}
      </div>
    </div>
  );
};

export default Modal;