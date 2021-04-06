import { combineReducers } from "redux";
import movieActions from "./movieActions";
import { createReducer } from "@reduxjs/toolkit";

const items = createReducer([], {
  [movieActions.addMovieSuccess]: (state, { payload }) => [...state, payload],
  [movieActions.removeMovieSuccess]: (state, { payload }) =>
    state.filter((movie) => movie.id !== payload),
  [movieActions.getMovieSuccess]: (_, { payload }) => payload,
});

const search = createReducer([], {});

export default combineReducers({ items, search });
