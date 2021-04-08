import { combineReducers } from "redux";
import movieActions from "./movieActions";
import { createReducer } from "@reduxjs/toolkit";

const items = createReducer([], {
  [movieActions.addMovieSuccess]: (state, { payload }) => [payload, ...state],
  [movieActions.removeMovieSuccess]: (state, { payload }) =>
    state.filter((movie) => movie.id !== payload),
  [movieActions.getMovieSuccess]: (_, { payload }) => payload,
  [movieActions.sortByNameSuccess]: (_, { payload }) => payload,
});

const searchByName = createReducer([], {
  [movieActions.getMovieByNameSuccess]: (_, { payload }) => payload,
});
const searchByActor = createReducer([], {
  [movieActions.getMovieByActorSuccess]: (_, { payload }) => payload,
});

export default combineReducers({ items, searchByName, searchByActor });
