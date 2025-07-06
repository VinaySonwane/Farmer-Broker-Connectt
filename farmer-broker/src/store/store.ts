// store.ts
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

import userReducer from "./userSlice";
import brokerReducer from "./brokerSlice";

// Combine reducers (if you add more in future)
const rootReducer = combineReducers({
  user: userReducer,
  broker: brokerReducer, // 👈 add this
});

// Persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "broker"], // Only persist the user slice
};

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    }),
});

// Persistor
export const persistor = persistStore(store);

// Infer types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// import { configureStore } from "@reduxjs/toolkit";
// import userReducer from "./userSlice";

// export const store = configureStore({
//   reducer: {
//     user: userReducer,
//   },
// });

// // Infer types
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
