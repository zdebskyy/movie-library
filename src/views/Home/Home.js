import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import movieOperations from "../../redux/movieOperation";
import styles from "./Home.module.css";
import { useSelector } from "react-redux";
import { getAllMovies } from "../../redux/movieSelector";
import MovieItem from "../../components/movieItem/MovieItem";
import Modal from "../../components/Modal/Modal";

const Home = () => {
  const [movieName, setMovieName] = useState("");
  const [productionDate, setDate] = useState(0);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [actors, setActors] = useState([]);
  const [format, setFormat] = useState("");
  const [file, setFile] = useState(null);
  const [open, setOpen] = useState(false);

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
    setDate("");
    setFormat("");
    setActors([]);
    toast.success("Movie successfuly added 👌🏻");
  };

  //================================================================

  useEffect(() => {
    dispatch(movieOperations.getMovies());
  }, [dispatch]);
  //================================================================

  const onChange = (e) => {
    setFile(e.target.files[0]);
  };

  const submitUploadForm = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("file", file, file.name);
    dispatch(movieOperations.upload(fd));
    setFile(null);
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
              min="1850"
              max="2021"
              type="number"
              className={styles.input}
              onChange={movieDate}
            />
            <p className={styles.formTitle}>Format</p>
            <select
              name="select"
              className={styles.select}
              onInput={selectedFormHandler}
              defaultValue={format}
            >
              <option value={format} disabled>
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
            encType="multipart/form-data"
            method="post"
            action="/api/movies/upload"
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
        {movies.length < 1 ? (
          <p className={styles.noContent}>No movies added</p>
        ) : (
          <ul className={styles.movieList}>
            {movies.map((item) => (
              <MovieItem item={item} key={item._id} />
            ))}
          </ul>
        )}
      </div>
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default Home;
