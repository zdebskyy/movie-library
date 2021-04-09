export const getAllMovies = (state) => {
  return state.movies.items;
};

export const getMovieByName = (state) => {
  return state.movies.searchByName;
};

export const getMovieByActor = (state) => {
  return state.movies.searchByActor;
};
