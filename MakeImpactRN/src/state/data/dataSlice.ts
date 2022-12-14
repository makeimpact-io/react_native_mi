import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Commitment, Company, SASB, SDG, Sector } from '../../types';

interface AppData {
  sdgs: SDG[];
  companies: Company[];
  commitments: Commitment[];
  sasbs: SASB[];
  sectors: Sector[];
}

const initialState = {
  sdgs: [],
  companies: [],
  commitments: [],
  sasbs: [],
  sectors: [],
} as AppData;

const tempUserSlice = createSlice({
  name: 'tempUser',
  initialState,
  reducers: {
    receiveSDGs(state, action: PayloadAction<SDG[]>) {
      state.sdgs = action.payload;
    },
    receiveCompanies(state, action: PayloadAction<Company[]>) {
      state.companies = action.payload;
    },
    receiveCommitments(state, action: PayloadAction<Commitment[]>) {
      state.commitments = action.payload;
    },
    receiveSASBs(state, action: PayloadAction<SASB[]>) {
      state.sasbs = action.payload;
    },
    receiveSectors(state, action: PayloadAction<Sector[]>) {
      state.sectors = action.payload;
    },
  },
});

export const {
  receiveSDGs,
  receiveCompanies,
  receiveCommitments,
  receiveSASBs,
  receiveSectors,
} = tempUserSlice.actions;

export default tempUserSlice.reducer;
