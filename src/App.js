import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import styles from "./App.module.css";
import "./main.css";
import routes from "./utils/routes";
import Header from "./components/Header/Header";
function App() {
  return (
    <div className={styles.container}>
      <Header />
      <Suspense fallback={null}>
        <Switch>
          {routes.map((route) => (
            <Route key={route.label} {...route} />
          ))}
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
