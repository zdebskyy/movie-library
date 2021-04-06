import React from "react";
import ShowDetails from "../ShowDetails/ShowDetails";
import { Link, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import movieOperations from "../../redux/movieOperation";
import styles from "./MovieItem.module.css";

const MovieItem = ({ item }) => {
  const dispatch = useDispatch();

  const removeMovie = (id) => {
    dispatch(movieOperations.removeMovie(id));
  };
  return (
    <div className={styles.container}>
      <li className={styles.movieItem}>
        <span>Movie name: {item.movieName}</span>

        <button
          type="button"
          className={styles.btn}
          onClick={() => removeMovie(item._id)}
        >
          Delete
        </button>
      </li>
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
    </div>
  );
};

export default MovieItem;
