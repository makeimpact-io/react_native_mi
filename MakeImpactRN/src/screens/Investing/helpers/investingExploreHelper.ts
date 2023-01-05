import { Company } from '../../../types';

export function getImpactChampions(companies: Company[]) {
  const top5ImpactChamps = companies
    .filter(
      company => company.commitments.length >= 5 && company.sdgs.length > 6,
    )
    .sort(a => a.commitments.length)
    .slice(0, 5);

  return top5ImpactChamps;
}
export function getTop100Companies(companies: Company[]) {
  const top100Companies = companies
    .filter(company => company.rank)
    .sort((a, b) => {
      if (a.rank === undefined && b.rank === undefined) {
        return 0;
      } else if (a.rank === undefined) {
        return 1;
      } else if (b.rank === undefined) {
        return -1;
      } else {
        return a.rank - b.rank;
      }
    })
    .slice(0, 10);

  return top100Companies;
}
export function getScienceBasedCompanies(companies: Company[]) {
  const scienceBasedCompanies = companies
    .filter(company => company.commitments.includes('2'))
    .sort(a => a.commitments.length)
    .slice(0, 10);

  return scienceBasedCompanies;
}
