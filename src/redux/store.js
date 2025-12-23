import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "../redux/slices/userSlice"
import reviewReducer from '../redux/slices/reviewSlice'
// import cartReducer from "../redux/slices/cartSlice";

// combine reducers
const rootReducer = combineReducers({
   // cart: cartReducer,
   auth: userReducer,
   review: reviewReducer,
});

// persist config
const persistConfig = {
   key: "root",
   storage,
   whitelist: ["cart", "auth", "review"],
};

// persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// store
export const store = configureStore({
   reducer: persistedReducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: false,
      }),
});

// persistor
export const persistor = persistStore(store);
