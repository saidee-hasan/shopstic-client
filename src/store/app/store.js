import storage from "redux-persist/lib/storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storageSession from "redux-persist/lib/storage/session";
import persistStore from "redux-persist/es/persistStore";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
  FLUSH,
  PAUSE,
  PURGE,
  PERSIST,
  REGISTER,
  REHYDRATE,
  persistReducer,
} from "redux-persist";
import { baseApi } from "../api/baseApi";
import userReducer from "../main/features/user/userSlice";
import userCartReducer from "../main/features/cart/userCartSlice.js";
import userWishlistReducer from "../main/features/wishlist/wishlistSlice.js";
import userAddressReducer from "../dashboard/features/address/addressSlice.js";
import userqnaReducer from "../dashboard/features/QnA/qnaSlice.js";
import { imgbbApi } from "../main/service/imageUpload/imageUploadApi.js";

const persistConfig = {
  key: "root",
  version: 1,
  storage: storage,
  blacklist: [baseApi.reducerPath],
};

const sessionConfig = {
  key: "session",
  version: 2,
  storage: storageSession,
};

const rootPersistReducers = combineReducers({
  userCartReducer,
  userWishlistReducer,
  userqnaReducer,
});

const sessionReducers = combineReducers({
  userReducer,
  userAddressReducer,
});

const persistedReducers = persistReducer(persistConfig, rootPersistReducers);

const sessionReducer = persistReducer(sessionConfig, sessionReducers);

const store = configureStore({
  reducer: {
    local: persistedReducers,
    session: sessionReducer,
    [baseApi.reducerPath]: baseApi.reducer,
    [imgbbApi.reducerPath]: imgbbApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(baseApi.middleware)
      .concat(imgbbApi.middleware),
});

export default store;
export const persistor = persistStore(store);
setupListeners(store.dispatch);
