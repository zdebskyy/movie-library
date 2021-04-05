import { lazy } from "react";

export default [
  {
    path: "/",
    label: "Home",
    exact: true,
    component: lazy(() =>
      import("../views/Home/Home" /* webpackChunkName: "Home" */)
    ),
  },
  {
    path: "/search",
    label: "Search",
    exact: true,
    component: lazy(() =>
      import("../views/Search/Search" /* webpackChunkName: "Contacts" */)
    ),
  },
];
