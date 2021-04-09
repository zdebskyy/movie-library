import { combineReducers } from "redux";
import movieActions from "./movieActions";
import { createReducer } from "@reduxjs/toolkit";

const items = createReducer([], {
  [movieActions.addMovieSuccess]: (state, { payload }) => [payload, ...state],
  [movieActions.removeMovieSuccess]: (state, { payload }) => {
    return state.filter((movie) => movie._id !== payload);
  },
  [movieActions.getMovieSuccess]: (_, { payload }) => payload,
  [movieActions.sortByNameSuccess]: (_, { payload }) => payload,
});

const searchByName = createReducer([], {
  [movieActions.getMovieByNameSuccess]: (state, { payload }) => payload,
  [movieActions.resetMovieSearch]: (state, { payload }) => [],
});
const searchByActor = createReducer([], {
  [movieActions.getMovieByActorSuccess]: (state, { payload }) => payload,
  [movieActions.resetActorSearch]: (state, { payload }) => [],
});

export default combineReducers({ items, searchByName, searchByActor });
