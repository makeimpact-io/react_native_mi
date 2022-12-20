import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  AcademyArticle,
  AcademyCategory,
  Commitment,
  Company,
  SASB,
  SDG,
  Sector,
  TradingData,
} from '../../types';

interface AppData {
  tradingData: TradingData[];
  sdgs: SDG[];
  companies: Company[];
  commitments: Commitment[];
  sasbs: SASB[];
  sectors: Sector[];
  academyCategories: AcademyCategory[];
  academyArticles: AcademyArticle[];
}

const initialState = {
  tradingData: [],
  sdgs: [],
  companies: [],
  commitments: [],
  sasbs: [],
  sectors: [],
  academyCategories: [],
  academyArticles: [],
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
    receiveTradingData(state, action: PayloadAction<TradingData[]>) {
      state.tradingData = action.payload;
    },
    receiveAcademyCategories(state, action: PayloadAction<AcademyCategory[]>) {
      state.academyCategories = action.payload;
    },
    receiveAcademyArticles(state, action: PayloadAction<AcademyArticle[]>) {
      state.academyArticles = action.payload;
    },
    calculateCompaniesMatch(state, action: PayloadAction<string[]>) {
      for (let i = 0; i < state.companies.length; i++) {
        const company = state.companies[i];
        company.match = 0;
        for (let j = 0; j < action.payload.length; j++) {
          const sdgId = action.payload[j];
          if (company.sdgs.includes(sdgId)) {
            company.match += 100 / action.payload.length;
          }
        }
      }
    },
    assignTradingDataToCompanies(state) {
      if (state.companies.length !== 0 && state.tradingData.length !== 0) {
        for (let i = 0; i < state.companies.length; i++) {
          const company = state.companies[i];
          company.tradingData = state.tradingData.filter(
            data => data.ISIN === company.isin,
          )[0];
        }
      }
    },
  },
});

export const {
  receiveSDGs,
  receiveCompanies,
  receiveCommitments,
  receiveSASBs,
  receiveSectors,
  receiveTradingData,
  calculateCompaniesMatch,
  assignTradingDataToCompanies,
  receiveAcademyCategories,
  receiveAcademyArticles,
} = tempUserSlice.actions;

export default tempUserSlice.reducer;
