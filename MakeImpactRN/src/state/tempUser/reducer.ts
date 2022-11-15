import { createReducer } from '@reduxjs/toolkit';
import Gender from '../../utils/enums/Gender';
import Invested from '../../utils/enums/Invested';
import {
  setAge,
  setEmail,
  setFirstName,
  setGender,
  setInvested,
  setLastName,
  setPhoneNumber,
  toggleGoal,
} from './actions';

interface TempUser {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  age: number | null;
  phoneNumber: string | null;
  gender: Gender | null;
  invested: Invested | null;
  goals: Array<number>;
}

const initialState = {
  firstName: null,
  lastName: null,
  email: null,
  age: null,
  phoneNumber: null,
  gender: null,
  invested: null,
  goals: [],
} as TempUser;

const tempUserReducer = createReducer(initialState, builder => {
  builder.addCase(setFirstName, (state, action) => {
    state.firstName = action.payload;
  });
  builder.addCase(setLastName, (state, action) => {
    state.lastName = action.payload;
  });
  builder.addCase(setEmail, (state, action) => {
    state.email = action.payload;
  });
  builder.addCase(setAge, (state, action) => {
    state.age = action.payload;
  });
  builder.addCase(setPhoneNumber, (state, action) => {
    state.phoneNumber = action.payload;
  });
  builder.addCase(setGender, (state, action) => {
    state.gender = action.payload;
  });
  builder.addCase(setInvested, (state, action) => {
    state.invested = action.payload;
  });
  builder.addCase(toggleGoal, (state, action) => {
    if (state.goals?.includes(action.payload)) {
      state.goals = state.goals?.filter(element => element !== action.payload);
    } else {
      state.goals.push(action.payload);
    }
  });
});

export default tempUserReducer;
