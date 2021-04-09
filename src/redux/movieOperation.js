import axios from "axios";
import movieActions from "./movieActions";

// axios.defaults.baseURL = "https://frozen-plains-67322.herokuapp.com/api/movies";
axios.defaults.baseURL = "http://localhost:3001/api/movies";

const addMovie = (movie) => (dispatch) => {
  dispatch(movieActions.addMovieRequest());

  axios
    .post("/add-movie", movie)
    .then((response) => {
      dispatch(movieActions.addMovieSuccess(response.data));
    })
    .catch((error) => dispatch(movieActions.addMovieError(error)));
};

const removeMovie = (id) => (dispatch) => {
  dispatch(movieActions.removeMovieRequest());
  axios
    .delete(`/remove-movie/${id}`)
    .then(() => {
      dispatch(movieActions.removeMovieSuccess(id));
    })
    .catch((error) => dispatch(movieActions.removeMovieError(error)));
};

const getMovies = () => (dispatch) => {
  dispatch(movieActions.getMovieRequest());
  axios
    .get("/")
    .then((response) => {
      dispatch(movieActions.getMovieSuccess(response.data));
    })
    .catch((error) => dispatch(movieActions.getMovieError(error)));
};

const searchByName = (name) => (dispatch) => {
  dispatch(movieActions.getMovieByNameRequest());
  axios
    .get(`/find-by-name/${name}`)
    .then((response) => {
      dispatch(movieActions.getMovieByNameSuccess(response.data));
    })
    .catch((error) => dispatch(movieActions.getMovieByNameError(error)));
};

const searchByActorName = (name) => (dispatch) => {
  dispatch(movieActions.getMovieByActorRequest());
  axios
    .get(`/find-by-actor/${name}`)
    .then((response) => {
      dispatch(movieActions.getMovieByActorSuccess(response.data));
    })
    .catch((error) => dispatch(movieActions.getMovieByActorError(error)));
};

const getSortedList = () => (dispatch) => {
  dispatch(movieActions.sortByNameRequest());
  axios
    .get("/sort-by-name")
    .then((response) => {
      dispatch(movieActions.sortByNameSuccess(response.data));
    })
    .catch((error) => dispatch(movieActions.sortByNameError(error)));
};

const upload = (file) => (dispatch) => {
  console.log(file);
  dispatch(movieActions.uploadFileRequest());
  axios
    .post("/upload", file)
    .then((response) => {
      console.log(response);
      dispatch(movieActions.uploadFileSuccess(response.data));
    })
    .catch((error) => dispatch(movieActions.uploadFileError(error)));
};

const movieOperations = {
  addMovie,
  removeMovie,
  getMovies,
  searchByName,
  searchByActorName,
  getSortedList,
  upload,
};

export default movieOperations;
