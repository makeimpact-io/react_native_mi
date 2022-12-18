import { TradingData } from './TradingData';

export interface Company {
  id: string;
  name: string;
  employees: number;
  csrLink: string;
  logo: string;
  sdgs: string[];
  commitments: string[];
  countryId: string;
  sectorId: string;
  twitterAccount: string;
  isin: string;
  conId: string;
  masterDataCompanyName: string;
  match: number;
  website: string;
  rank: number | undefined;
  stocksData: Map<string, string> | undefined;
  tradingData: TradingData | undefined;
}
