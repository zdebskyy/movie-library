import React, { useState } from "react";
import styles from "./MovieItem.module.css";

const MovieItem = ({ item, onModalOpen }) => {
  const [open, setOpen] = useState(false);

  const onOpen = () => {
    setOpen(!open);
  };

  return (
    <div className={styles.container}>
      <li className={styles.movieItem}>
        <span className={styles.name}>Movie name: {item.movieName}</span>

        <button type="button" className={styles.btn} onClick={onOpen}>
          {open ? "Show less" : "Show more"}
        </button>
        <button
          type="button"
          className={styles.btn}
          onClick={() => onModalOpen(item._id)}
        >
          Delete
        </button>
      </li>
      {open && (
        <>
          <p>Production date: {item.productionDate}</p>
          <p>Format: {item.format}</p>
          <ul>
            Cast:
            {item.actorsList.map((item) => (
              <li key={item._id}>
                <span>
                  {item.name} {item.surname}{" "}
                </span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default MovieItem;
