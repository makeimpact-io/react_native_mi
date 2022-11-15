import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from './middleware/logger';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import tempUserReducer from './tempUser/reducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const reducer = {
  tempUserReducer: persistReducer(persistConfig, tempUserReducer),
};

const store = configureStore({
  reducer: reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(loggerMiddleware, thunkMiddleware),
});

export default store;

export const persistor = persistStore(store);
