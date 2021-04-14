import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getMovieByName, getMovieByActor } from "../../redux/movieSelector";
import styles from "./Search.module.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-tabs/style/react-tabs.css";
import movieOperation from "../../redux/movieOperation";
import movieActions from "../../redux/movieActions";

const Search = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [actorName, setActorName] = useState("");

  const movieByName = useSelector(getMovieByName);
  const movieByActor = useSelector(getMovieByActor);

  const onResetMovieSearch = () => {
    dispatch(movieActions.resetMovieSearch());
  };
  const onResetActorSearch = () => {
    dispatch(movieActions.resetActorSearch());
  };
  const nameHandler = (e) => {
    setName(e.target.value);
  };
  const actorNameHandler = (e) => {
    setActorName(e.target.value);
  };
  const onSubmitActorName = (e) => {
    e.preventDefault();
    dispatch(movieOperation.searchByActorName(actorName));
    setActorName("");
  };
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(movieOperation.searchByName(name));
    setName("");
  };
  return (
    <div className={styles.container}>
      <Tabs>
        <TabList>
          <Tab>Search by movie name</Tab>
          <Tab>Search by actors name or surname</Tab>
        </TabList>

        <TabPanel>
          <div>
            <form onSubmit={onSubmit} className={styles.searchForm}>
              <input
                className={styles.input}
                type="text"
                value={name}
                onChange={nameHandler}
              />
              <div className={styles.btnContainer}>
                <button type="submit" className={styles.btn}>
                  Search
                </button>
                <button
                  type="button"
                  className={styles.btn}
                  onClick={onResetMovieSearch}
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
          {movieByName.length < 1 ? (
            <p className={styles.noContent}>No content</p>
          ) : (
            <div className={styles.movie}>
              {movieByName.map((item) => (
                <div key={item._id} className={styles.wrap}>
                  <div className={styles.main}>
                    <span>Movie name: {item.movieName}</span>
                    <p>Production date: {item.productionDate}</p>
                    <p>Format: {item.format}</p>
                  </div>
                  <div className={styles.actors}>
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
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabPanel>
        <TabPanel>
          <div>
            <form onSubmit={onSubmitActorName} className={styles.searchForm}>
              <input
                className={styles.input}
                type="text"
                value={actorName}
                onChange={actorNameHandler}
                pattern="[A-ZА-ЯЁЄІЇ][A-Za-zА-яЁёЄєІіЇї',-]+"
              />
              <div className={styles.btnContainer}>
                <button type="submit" className={styles.btn}>
                  Search
                </button>
                <button
                  type="button"
                  className={styles.btn}
                  onClick={onResetActorSearch}
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
          {movieByActor.length < 1 ? (
            <p className={styles.noContent}>No content</p>
          ) : (
            <div className={styles.movie}>
              {movieByActor.map((item) => (
                <div key={item._id} className={styles.wrap}>
                  <div className={styles.main}>
                    <span>Movie name: {item.movieName}</span>
                    <p>Production date: {item.productionDate}</p>
                    <p>Format: {item.format}</p>
                  </div>
                  <div className={styles.actors}>
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
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabPanel>
      </Tabs>
      <ToastContainer position="top-right" autoClose={1500} />
    </div>
  );
};

export default Search;
