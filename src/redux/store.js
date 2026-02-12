import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "../redux/slices/userSlice"
import reviewReducer from '../redux/slices/reviewSlice'
import wishReducer from '../redux/slices/wishSlice'
import paymentHistoryReducer from '../redux/slices/paymentHistorySlice'

// combine reducers
const rootReducer = combineReducers({
   wish: wishReducer,
   auth: userReducer,
   review: reviewReducer,
   paymentHistory: paymentHistoryReducer
});

const persistConfig = {
   key: "root",
   storage,
   whitelist: ["wish", "auth", "review", "paymentHistory"],
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
