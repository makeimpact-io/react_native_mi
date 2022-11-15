import { createAction } from '@reduxjs/toolkit';
import Gender from '../../utils/enums/Gender';
import Invested from '../../utils/enums/Invested';

export const setFirstName = createAction<string | null>(
  'tempUser/setFirstName',
);

export const setLastName = createAction<string | null>('tempUser/setLastName');

export const setEmail = createAction<string | null>('tempUser/setEmail');

export const setAge = createAction<number | null>('tempUser/setAge');

export const setPhoneNumber = createAction<string | null>(
  'tempUser/setPhoneNumber',
);

export const setGender = createAction<Gender | null>('tempUser/setGender');

export const setInvested = createAction<Invested | null>(
  'tempUser/setInvested',
);

export const toggleGoal = createAction<number>('tempUser/toggleGoal');
