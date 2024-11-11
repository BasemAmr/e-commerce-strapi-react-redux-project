import { configureStore } from '@reduxjs/toolkit';
import loginSlice from './features/loginSlice';
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

const persistConfig = {
  key: 'root',
  storage,
};

const persistedCart = persistReducer(persistConfig, cartSlice.reducer);

export const store = configureStore({
  reducer: {
    auth: loginSlice,
    cart: persistedCart,
    global: globalSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },

    }).concat(apiSlice.middleware),

    
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);