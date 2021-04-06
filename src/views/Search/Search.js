import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./Search.module.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import movieOperation from "../../redux/movieOperation";

const Search = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [actorName, setActorName] = useState("");

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
          <Tab>Search by actors</Tab>
        </TabList>

        <TabPanel>
          <div className={styles.photosContainer}>
            <form onSubmit={onSubmit}>
              <input type="text" value={name} onChange={nameHandler} />
              <button type="submit">Search</button>
            </form>
          </div>
        </TabPanel>
        <TabPanel>
          <div className={styles.photosContainer}>
            <form onSubmit={onSubmitActorName}>
              <input
                type="text"
                value={actorName}
                onChange={actorNameHandler}
              />
              <button type="submit">Search</button>
            </form>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Search;
