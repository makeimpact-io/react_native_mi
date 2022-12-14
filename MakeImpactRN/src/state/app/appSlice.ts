import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  initializing: boolean;
  loggedIn: boolean;
  registering: boolean;
  initialUserAdded: boolean;
  subscribedForUserData: boolean;
}

const initialState = {
  initializing: true,
  loggedIn: false,
  registering: false,
  initialUserAdded: false,
  subscribedForUserData: false,
} as AppState;

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setInitializing(state, action: PayloadAction<boolean>) {
      state.initializing = action.payload;
    },
    setLoggedIn(state, action: PayloadAction<boolean>) {
      state.loggedIn = action.payload;
    },
    setRegistering(state, action: PayloadAction<boolean>) {
      state.registering = action.payload;
    },
    setInitialUserAdded(state, action: PayloadAction<boolean>) {
      state.initialUserAdded = action.payload;
    },
    setSubscribedForUserData(state, action: PayloadAction<boolean>) {
      state.subscribedForUserData = action.payload;
    },
  },
});

export const {
  setInitializing,
  setLoggedIn,
  setRegistering,
  setInitialUserAdded,
  setSubscribedForUserData,
} = appSlice.actions;

export default appSlice.reducer;
