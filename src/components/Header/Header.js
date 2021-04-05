import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={styles.header}>
      <NavLink
        to="/"
        exact={true}
        className={styles.link}
        activeClassName={styles.active}
      >
        HOME PAGE
      </NavLink>
      <NavLink
        to="/search"
        className={styles.link}
        activeClassName={styles.active}
      >
        SEARCH PAGE
      </NavLink>
    </div>
  );
};

export default Header;
