import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import movieOperations from "../../redux/movieOperation";
import styles from "./Home.module.css";
import { useSelector } from "react-redux";
import { getAllMovies } from "../../redux/movieSelector";
import MovieItem from "../../components/movieItem/MovieItem";
import Modal from "../../components/Modal/Modal";
import Select from "../../components/Select/Select";

const Home = () => {
  const [movieName, setMovieName] = useState("");
  const [productionDate, setDate] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [actors, setActors] = useState([]);
  const [format, setFormat] = useState("default");
  const [sort, setSort] = useState("A-Z");
  const [file, setFile] = useState("");
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const fileInput = useRef();
  const dispatch = useDispatch();
  const movies = useSelector(getAllMovies);

  const onSubmitActorForm = (e) => {
    e.preventDefault();
    const actor = {
      name,
      surname,
    };
    const duplicate = actors.find(
      (item) =>
        item.name.toLowerCase() &&
        item.surname.toLowerCase() === actor.name.toLowerCase() &&
        actor.surname.toLowerCase()
    );

    if (duplicate) {
      toast.warn("You cant add same actors...");
      setName("");
      setSurname("");
      return;
    }

    setActors([...actors, actor]);

    setName("");
    setSurname("");
  };

  const nameHandler = (e) => {
    setName(e.target.value.trim());
  };
  const surnameHandler = (e) => {
    setSurname(e.target.value.trim());
  };

  //================================================================
  const selectedFormHandler = (value) => {
    setFormat(value);
  };
  const movieNameHandler = (e) => {
    setMovieName(e.target.value.trimStart());
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
    setFormat(format);
    setActors([]);
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

    if (file.size === 0) {
      toast.error("You cant load an empty file 🤷🏻‍♂️");
      fileInput.current.value = "";
      return;
    }
    const fd = new FormData();
    fd.append("file", file, file.name); // почему файл нейм на node берется как extention?
    dispatch(movieOperations.upload(fd));
    toast.success("File uploaded ✔");
    fileInput.current.value = "";
    setFile("");
  };
  //============================================================================

  const sortHandler = () => {
    dispatch(movieOperations.getSortedList(sort));
  };
  //============================================================================

  const onModalOpen = (id) => {
    setOpen(true);
    setId(id);
  };
  const onModalClose = () => {
    setOpen(false);
  };
  //=============================================================================

  const onSortInput = (e) => {
    setSort(e.target[e.target.selectedIndex].text);
  };

  return (
    <div className={styles.container}>
      {open && <Modal id={id} onModalClose={onModalClose} />}
      <div className={styles.addSection}>
        <div className={styles.formsPosition}>
          <form onSubmit={onSubmitMainForm}>
            <p className={styles.formTitle}>Movie name</p>
            <input
              value={movieName}
              placeholder="Enter movie name"
              type="text"
              required
              minLength="3"
              className={styles.input}
              onChange={movieNameHandler}
            />
            <p className={styles.formTitle}>Production date</p>
            <input
              placeholder="Enter production date"
              value={productionDate}
              min="1850"
              max="2021"
              required
              type="number"
              className={styles.input}
              onChange={movieDate}
            />
            <p className={styles.formTitle}>Format</p>
            <Select selectedFormHandler={selectedFormHandler} />
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
              pattern="[A-ZА-ЯЁЄІЇ][A-Za-zА-яЁёЄєІіЇї',-]+"
              value={name}
              required
              onInput={nameHandler}
            />
            <input
              type="text"
              className={styles.input2}
              placeholder="Surname"
              pattern="[A-ZА-ЯЁЄІЇ][A-Za-zА-яЁёЄєІіЇї',-]+"
              value={surname}
              required
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
            ref={fileInput}
          />
          <button type="submit" className={styles.uploadBtn} disabled={!file}>
            Upload
          </button>
        </form>
      </div>

      <div className={styles.movieSection}>
        <div className={styles.sortContainer}>
          <button className={styles.btnSort} onClick={sortHandler}>
            Sort by name
          </button>
          <select className={styles.sortSelect} onInput={onSortInput}>
            <option value="value1" className={styles.option}>
              A-Z
            </option>
            <option value="value2" className={styles.option}>
              Z-A
            </option>
          </select>
        </div>

        {movies.length < 1 ? (
          <p className={styles.noContent}>No movies added</p>
        ) : (
          <ul className={styles.movieList}>
            {movies.map((item) => (
              <MovieItem item={item} key={item._id} onModalOpen={onModalOpen} />
            ))}
          </ul>
        )}
      </div>
      <ToastContainer position="top-right" autoClose={1500} />
    </div>
  );
};

export default Home;
