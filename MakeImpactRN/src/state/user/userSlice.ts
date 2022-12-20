import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types';

const initialState = {
  fbUser: null,
  uid: '',
  firstName: '',
  lastName: '',
  email: '',
  age: null,
  phoneNumber: null,
  gender: null,
  invested: null,
  goals: [],
} as User;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    receiveUser(state, action: PayloadAction<User>) {
      state.uid = action.payload.uid;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.age = action.payload.age;
      state.phoneNumber = action.payload.phoneNumber;
      state.gender = action.payload.gender;
      state.invested = action.payload.invested;
      state.goals = action.payload.goals;
      console.log(action.payload);
    },
    toggleGoal(state, action: PayloadAction<string>) {
      if (state.goals?.includes(action.payload) && state.goals.length > 3) {
        state.goals = state.goals?.filter(
          element => element !== action.payload,
        );
      } else if (!state.goals?.includes(action.payload)) {
        state.goals.push(action.payload);
      }
    },
    resetUser(state) {
      state.uid = '';
      state.firstName = '';
      state.lastName = '';
      state.email = '';
      state.age = null;
      state.phoneNumber = null;
      state.gender = null;
      state.invested = null;
      state.goals = [];
    },
    setFbUser(
      state,
      action: PayloadAction<FirebaseAuthTypes.User | null | undefined>,
    ) {
      if (action.payload) {
        state.fbUser = action.payload;
      }
    },
  },
});

export const { receiveUser, toggleGoal, resetUser, setFbUser } =
  userSlice.actions;

export default userSlice.reducer;
