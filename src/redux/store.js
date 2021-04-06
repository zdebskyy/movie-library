// import { configureStore } from "@reduxjs/toolkit";
// import movieReducer from "./movieReducer";

// const store = configureStore({
//   reducer: {
//     movies: movieReducer,
//   },
// });
// export default store;

import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import movieReducer from "./movieReducer";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const movieConfig = {
  key: "movies",
  storage,
  whitelist: ["items"],
};

export const store = configureStore({
  reducer: {
    movies: persistReducer(movieConfig, movieReducer),
  },
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store);
