export const getAllMovies = (state) => {
  return state.movies.items;
};

export const getMovieByName = (state) => {
  console.log(state);
  return state.movies.searchByName;
};

export const getMovieByActor = (state) => {
  console.log(state);
  return state.movies.searchByActor;
};
