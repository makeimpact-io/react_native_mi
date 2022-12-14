import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Gender from '../../utils/enums/Gender';
import Invested from '../../utils/enums/Invested';

interface TempUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmedPassword: string;
  age: number | null;
  phoneNumber: string | null;
  gender: Gender | null;
  invested: Invested | null;
  goals: Array<string>;
}

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmedPassword: '',
  age: null,
  phoneNumber: null,
  gender: null,
  invested: null,
  goals: [],
} as TempUser;

const tempUserSlice = createSlice({
  name: 'tempUser',
  initialState,
  reducers: {
    setFirstName(state, action: PayloadAction<string>) {
      state.firstName = action.payload;
    },
    setLastName(state, action: PayloadAction<string>) {
      state.lastName = action.payload;
    },
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
    setPassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
    },
    setConfirmedPassword(state, action: PayloadAction<string>) {
      state.confirmedPassword = action.payload;
    },
    setAge(state, action: PayloadAction<number>) {
      state.age = action.payload;
    },
    setPhoneNumber(state, action: PayloadAction<string>) {
      state.phoneNumber = action.payload;
    },
    setGender(state, action: PayloadAction<Gender>) {
      state.gender = action.payload;
    },
    setInvested(state, action: PayloadAction<Invested>) {
      state.invested = action.payload;
    },
    toggleGoal(state, action: PayloadAction<string>) {
      if (state.goals?.includes(action.payload)) {
        state.goals = state.goals?.filter(
          element => element !== action.payload,
        );
      } else {
        state.goals.push(action.payload);
      }
    },
    resetTempUser(state) {
      state.password = '';
      state.confirmedPassword = '';
      state.firstName = '';
      state.lastName = '';
      state.email = '';
      state.age = null;
      state.phoneNumber = null;
      state.gender = null;
      state.invested = null;
      state.goals = [];
    },
  },
});

export const {
  setFirstName,
  setLastName,
  setEmail,
  setPassword,
  setConfirmedPassword,
  setAge,
  setGender,
  setInvested,
  setPhoneNumber,
  toggleGoal,
  resetTempUser,
} = tempUserSlice.actions;

export default tempUserSlice.reducer;
