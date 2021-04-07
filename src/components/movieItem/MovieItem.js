import React, { useState } from "react";
import { useDispatch } from "react-redux";
import movieOperations from "../../redux/movieOperation";
import styles from "./MovieItem.module.css";

const MovieItem = ({ item }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const onOpen = () => {
    setOpen(!open);
  };

  const removeMovie = (id) => {
    dispatch(movieOperations.removeMovie(id));
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
          onClick={() => removeMovie(item._id)}
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
              <li>
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
