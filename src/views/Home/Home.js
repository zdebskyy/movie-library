import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import movieOperations from "../../redux/movieOperation";
import styles from "./Home.module.css";
import { useSelector } from "react-redux";
import { getAllMovies } from "../../redux/movieSelector";
import MovieItem from "../../components/movieItem/MovieItem";

const Home = () => {
  const [movieName, setMovieName] = useState("");
  const [productionDate, setDate] = useState(0);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [actors, setActors] = useState([]);
  const [format, setFormat] = useState("");
  const [file, setFile] = useState(null);

  console.log();

  const dispatch = useDispatch();
  const movies = useSelector(getAllMovies);

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

    const movie = {
      movieName,
      productionDate: parseInt(productionDate),
      format,
      actorsList: actors,
    };

    dispatch(movieOperations.addMovie(movie));
    setMovieName("");
    setDate(0);
    setFormat("DEFAULT");
    setActors([]);
  };
  //================================================================

  useEffect(() => {
    dispatch(movieOperations.getMovies());
  }, []);
  //================================================================

  const onChange = (e) => {
    setFile(e.target.files[0]);
  };

  const submitUploadForm = (e) => {
    e.preventDefault();

    console.log(file);
    dispatch(movieOperations.upload(file));
  };
  //============================================================================

  const sortHandler = () => {
    dispatch(movieOperations.getSortedList());
  };

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
              defaultValue={"DEFAULT"}
            >
              <option value="DEFAULT" disabled>
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
        <form className={styles.upload} onSubmit={submitUploadForm}>
          <input
            type="file"
            name="file"
            className={styles.inputUpload}
            onChange={onChange}
          />
          <button type="submit" className={styles.uploadBtn}>
            Upload
          </button>
        </form>
      </div>

      <div className={styles.movieSection}>
        <button className={styles.btnSort} onClick={sortHandler}>
          Sort by name
        </button>
        <ul className={styles.movieList}>
          {movies.map((item) => (
            <MovieItem item={item} key={item._id} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;

{
  /* <form
          className={styles.upload}
          onSubmit={submitUploadForm}
          action="https://frozen-plains-67322.herokuapp.com/api/movies/upload"
          method="post"
          enctype="multipart/form-data"
        ></form> */
}
