import React, { useEffect } from "react";
import styles from "./Modal.module.css";
import movieOperations from "../../redux/movieOperation";
import { useDispatch } from "react-redux";

const Modal = ({ onModalClose, id }) => {
  const dispatch = useDispatch();
  const onRemoveMovie = () => {
    onModalClose();
    dispatch(movieOperations.removeMovie(id));
  };
  const modalEscCloseFunction = (e) => {
    if (e.code === "Escape") {
      onModalClose();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", modalEscCloseFunction);
    return () => {
      window.removeEventListener("keydown", modalEscCloseFunction);
    };
  }, []);

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.container}>
          <p className={styles.modalTitle}>Are you sure?</p>
          <div className={styles.btnContainer}>
            <button className={styles.btn} onClick={onRemoveMovie}>
              Yes
            </button>
            <button className={styles.btn} onClick={onModalClose}>
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
