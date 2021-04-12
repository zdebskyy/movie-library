import React, { useEffect } from "react";
import styles from "./Modal.module.css";

const Modal = ({ children, onClose }) => {
  const modalEscCloseFunction = (e) => {
    if (e.code === "Escape") {
      onClose(false);
    }
  };
  const modalClickCloseFunction = (e) => {
    if (e.target.nodeName === "DIV") {
      onClose(false);
    }
  };
  useEffect(() => {
    window.addEventListener("keydown", modalEscCloseFunction);
    window.addEventListener("click", modalClickCloseFunction);
    return () => {
      window.removeEventListener("keydown", modalEscCloseFunction);
      window.removeEventListener("click", modalClickCloseFunction);
    };
  }, []);

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>{children}</div>
    </div>
  );
};

export default Modal;
