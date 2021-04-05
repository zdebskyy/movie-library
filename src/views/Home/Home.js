import React, { useState } from "react";
import styles from "./Home.module.css";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [movieName, setMovieName] = useState("");
  const [date, setDate] = useState(0);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [actors, setActors] = useState([]);
  const [format, setFormat] = useState("");

  const onSubmitActorForm = (e) => {
    e.preventDefault();
    const actor = {
      name,
      surname,
    };
    setActors([...actors, actor]);
    setName("");
    setSurname("");
  };

  const nameHandler = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
  };
  const surnameHandler = (e) => {
    setSurname(e.target.value);
  };

  //================================================================
  const selectedFormHandler = (e) => {
    setFormat(e.target[e.target.selectedIndex].text);
  };
  const movieNameHandler = (e) => {
    setMovieName(e.target.value);
  };
  const movieDate = (e) => {
    setDate(e.target.value);
  };

  const onSubmitMainForm = (e) => {
    e.preventDefault();
    if (!movieName && date && format) {
      return;
    }
    const movie = {
      movieName,
      productionDate: parseInt(date),
      format,
      actorsList: actors,
    };
    setMovies([...movies, movie]);
    setMovieName("");
    setDate(0);
    setFormat("");
    setActors([]);
  };

  console.log(movies);
  console.log(actors);

  return (
    <div className={styles.container}>
      <div className={styles.addSection}>
        <div className={styles.formsPosition}>
          <form onSubmit={onSubmitMainForm}>
            <p className={styles.formTitle}>Movie name</p>
            <input
              type="text"
              className={styles.input}
              onChange={movieNameHandler}
            />
            <p className={styles.formTitle}>Production date</p>
            <input
              type="number"
              className={styles.input}
              onChange={movieDate}
            />
            <p className={styles.formTitle}>Format</p>
            <select
              name="select"
              className={styles.select}
              onInput={selectedFormHandler}
            >
              <option selected disabled>
                --Pick an Option--
              </option>
              <option value="value1" className={styles.option}>
                VHS
              </option>
              <option value="value2" className={styles.option}>
                DVD
              </option>
              <option value="value3" className={styles.option}>
                Blu-Ray
              </option>
            </select>
            <button
              type="submit"
              disabled={actors.length < 1}
              className={styles.btn}
            >
              Add movie
            </button>
          </form>
          <form onSubmit={onSubmitActorForm}>
            <p className={styles.formTitle}>Add actors</p>
            <input
              type="text"
              className={styles.input2}
              placeholder="Name"
              value={name}
              onInput={nameHandler}
            />
            <input
              type="text"
              className={styles.input2}
              placeholder="Surname"
              value={surname}
              onInput={surnameHandler}
            />
            <button type="submit" className={styles.smallBtn}>
              Add actor
            </button>
          </form>
        </div>
      </div>

      <div className={styles.movieSection}></div>
    </div>
  );
};

export default Home;
