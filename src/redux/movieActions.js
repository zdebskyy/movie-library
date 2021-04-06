import { createAction } from "@reduxjs/toolkit";

const addMovieRequest = createAction("movie/request");
const addMovieSuccess = createAction("movie/success");
const addMovieError = createAction("movie/error");

const removeMovieRequest = createAction("movie/removeRequest");
const removeMovieSuccess = createAction("movie/removeSuccess");
const removeMovieError = createAction("movie/removeError");

const getMovieRequest = createAction("movie/getRequest");
const getMovieSuccess = createAction("movie/getSuccess");
const getMovieError = createAction("movie/getError");

const getMovieByNameRequest = createAction("movie/getNameRequest");
const getMovieByNameSuccess = createAction("movie/getNameSuccess");
const getMovieByNameError = createAction("movie/getNameError");

const getMovieByActorRequest = createAction("movie/getActorRequest");
const getMovieByActorSuccess = createAction("movie/getActorSuccess");
const getMovieByActorError = createAction("movie/getActorError");

const movieActions = {
  addMovieRequest,
  addMovieSuccess,
  addMovieError,
  removeMovieRequest,
  removeMovieSuccess,
  removeMovieError,
  getMovieRequest,
  getMovieSuccess,
  getMovieError,
  getMovieByNameRequest,
  getMovieByNameSuccess,
  getMovieByNameError,
  getMovieByActorRequest,
  getMovieByActorSuccess,
  getMovieByActorError,
};

export default movieActions;
