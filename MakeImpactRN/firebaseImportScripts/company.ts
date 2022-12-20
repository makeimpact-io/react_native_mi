import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import oldCompaniesData from './oldCompanies.json';

interface Company {
  id: string;
  name: string;
  employees: number;
  website: string;
  logo: string;
  sdgs: string[];
  commitments: string[];
  countryId: string;
  sectorId: string;
  twitterAccount: string;
  isin: string;
  conId: string;
  csrLink: string;
  masterDataCompanyName: string;
  symbol: string;
  rank: number | null;
}

export async function fixSectors() {
  let oldCompanies: any[] = [];
  oldCompanies = oldCompanies.concat(
    oldCompaniesData.data['2022-04-25-1650902610049-0'].companies,
    oldCompaniesData.data['2022-04-25-1650902610049-1'].companies,
    oldCompaniesData.data['2022-04-25-1650902610049-2'].companies,
    oldCompaniesData.data['2022-04-25-1650902610049-3'].companies,
    oldCompaniesData.data['2022-04-25-1650902610049-4'].companies,
    oldCompaniesData.data['2022-04-25-1650902610049-5'].companies,
    oldCompaniesData.data['2022-04-25-1650902610049-6'].companies,
    oldCompaniesData.data['2022-04-25-1650902610049-7'].companies,
    oldCompaniesData.data['2022-04-25-1650902610049-8'].companies,
  );

  let validCompanies = [];
  for (let i = 0; i < oldCompanies.length; i++) {
    const company = oldCompanies[i];
    if (
      company.Below50 !== undefined &&
      company.CSRLink !== undefined &&
      company.CarbonPricing !== undefined &&
      company.ClimateSmartAgriculture !== undefined &&
      company.CompanyID !== undefined &&
      company.CompanyID !== '' &&
      company.CompanyLogo !== undefined &&
      company.CompanyLogo !== '' &&
      company.CompanyName !== undefined &&
      company.CompanyName !== '' &&
      company.CompanyWebsite !== undefined &&
      company.CompanyWebsite !== '' &&
      company.CorporateKnights !== undefined &&
      company.CountryID !== undefined &&
      company.CountryID !== '' &&
      company.EP100 !== undefined &&
      company.EV100 !== undefined &&
      company.Employees !== undefined &&
      company.Employees !== 0 &&
      company.ISIN !== undefined &&
      company.ISIN !== '' &&
      company.ImproveWaterSecurity !== undefined &&
      company.LCTPI !== undefined &&
      company.MasterDataCompanyName !== undefined &&
      company.MasterDataCompanyName !== '' &&
      company.RE100 !== undefined &&
      company.ReduceSLCPs !== undefined &&
      company.RemoveDeforestation !== undefined &&
      company.ReportClimateChangeInformation !== undefined &&
      company.ResponsibleClimatePolicy !== undefined &&
      company.SBTCommitted !== undefined &&
      company.SBTTargetSets !== undefined &&
      company.SDGs !== undefined &&
      company.ScienceBasedTargetsInitiative !== undefined &&
      company.SectorID !== undefined &&
      company.SectorID !== '' &&
      company.TwitterAccount !== undefined &&
      company.TwitterAccount !== '' &&
      company.conid !== undefined &&
      company.conid !== '' &&
      company.symbol !== undefined &&
      company.symbol !== ''
    ) {
      validCompanies.push(company);
    }
  }

  let newCompanies = [] as Company[];
  for (let i = 0; i < validCompanies.length; i++) {
    const validCompany = validCompanies[i];
    let newCompany = {} as Company;
    newCompany.id = validCompany.CompanyID.toString();
    newCompany.name = validCompany.CompanyName;
    newCompany.employees = validCompany.Employees;
    newCompany.website = validCompany.CompanyWebsite;
    newCompany.logo = validCompany.CompanyLogo;
    newCompany.countryId = validCompany.CountryID.toString();
    newCompany.sectorId = validCompany.SectorID.toString();
    newCompany.twitterAccount = validCompany.TwitterAccount;
    newCompany.isin = validCompany.ISIN;
    newCompany.conId = validCompany.conid;
    newCompany.masterDataCompanyName = validCompany.MasterDataCompanyName;
    newCompany.csrLink = validCompany.CSRLink;
    newCompany.symbol = validCompany.symbol;
    newCompany.commitments = [];
    newCompany.sdgs = [];

    for (let j = 0; j < validCompany.SDGs.length; j++) {
      newCompany.sdgs.push(validCompany.SDGs[j].toString());
    }
    if (
      validCompany.SBTTargetSets === 1 ||
      validCompany.ScienceBasedTargetsInitiative === 1 ||
      validCompany.SBTCommitted === 1
    ) {
      newCompany.commitments.push('2');
    }
    newCompany.commitments.push('4');
    if (validCompany.LCTPI === 1) {
      newCompany.commitments.push('5');
    }
    if (validCompany.RE100 === 1) {
      newCompany.commitments.push('6');
    }
    if (validCompany.EP100 === 1) {
      newCompany.commitments.push('7');
    }
    if (validCompany.Below50 === 1) {
      newCompany.commitments.push('8');
    }
    if (validCompany.EV100 === 1) {
      newCompany.commitments.push('9');
    }
    if (validCompany.RemoveDeforestation === 1) {
      newCompany.commitments.push('10');
    }
    if (validCompany.ClimateSmartAgriculture === 1) {
      newCompany.commitments.push('11');
    }
    if (validCompany.ReduceSLCPs === 1) {
      newCompany.commitments.push('12');
    }
    if (validCompany.CarbonPricing === 1) {
      newCompany.commitments.push('13');
    }
    if (validCompany.ResponsibleClimatePolicy === 1) {
      newCompany.commitments.push('14');
    }
    if (validCompany.ReportClimateChangeInformation === 1) {
      newCompany.commitments.push('15');
    }
    if (validCompany.ImproveWaterSecurity === 1) {
      newCompany.commitments.push('16');
    }
    if (validCompany.CorporateKnights !== 0) {
      newCompany.rank = validCompany.CorporateKnights;
      newCompany.commitments.push('1');
    }

    newCompanies.push(newCompany);
  }
}
