import React from "react";
import styles from "./Select.module.css";

const Select = ({ format, selectedFormHandler }) => {
  return (
    <select
      name="select"
      className={styles.select}
      onInput={(e) =>
        selectedFormHandler(e.target[e.target.selectedIndex].text)
      }
      defaultValue="default"
    >
      <option value="default" disabled>
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
  );
};

export default Select;
