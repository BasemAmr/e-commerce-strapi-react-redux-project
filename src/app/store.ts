import { configureStore } from '@reduxjs/toolkit';
import persistedAuthReducer from './features/loginSlice';
import cartSlice from './features/cartSlice';
import globalSlice from './features/globalSlice';
import { 
  persistStore, 
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import apiSlice from './services/apiSlice';
import userApi from './services/userApi';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedCart = persistReducer(persistConfig, cartSlice.reducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    cart: persistedCart,
    global: globalSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },

    }).concat(apiSlice.middleware)
    .concat(userApi.middleware),

    
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);