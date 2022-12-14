import { combineReducers, configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
// import loggerMiddleware from './middleware/logger';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import { useDispatch } from 'react-redux';
import userReducer from './user/userSlice';
import tempUserReducer from './tempUser/tempUserSlice';
import dataReducer from './data/dataSlice';
import appReducer from './app/appSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const reducer = combineReducers({
  tempUserReducer,
  dataReducer,
  userReducer,
  appReducer,
});
const persistantReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistantReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(thunkMiddleware),
});

export default store;

export const persistor = persistStore(store);

export type AppState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type AppPersist = typeof persistor;
