import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import progressReducer from './slices/progressSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['progress'], // Only persist progress state
};

const persistedProgressReducer = persistReducer(persistConfig, progressReducer);

export const store = configureStore({
  reducer: {
    progress: persistedProgressReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
    },
  }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
