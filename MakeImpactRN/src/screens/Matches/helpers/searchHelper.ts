import { Company } from '../../../types';

export function sortFilters(filters: { category: string; filter: string }[]) {
  return filters
    .filter(a => a.category)
    .sort((a, b) => {
      const nameA = a.category.toUpperCase();
      const nameB = b.category.toUpperCase();
      if (nameA < nameB) {
        return 1;
      }
      if (nameA > nameB) {
        return -1;
      }
      return 0;
    });
}

export function filterCompanies(
  filters: { category: string; filter: string }[],
  initialCompanies: Company[],
) {
  const sortedFilters = sortFilters(filters);
  let previousFilter = {};
  let previousList: Company[] = [];
  let companies = initialCompanies;

  for (let i = 0; i < sortedFilters.length; i++) {
    const filter = sortedFilters[i];
    //It goes through each filter category and keeps all companies that match at least one of the filters before going to the next category
    switch (filter.category) {
      case 'commitment':
        if (previousFilter !== 'commitment') {
          previousList = companies.concat();
          companies = companies.filter(a =>
            a.commitments.includes(filter.filter),
          );
          previousFilter = filter.category;
        } else {
          initialCompanies = initialCompanies.concat(
            previousList.filter(a => a.commitments.includes(filter.filter)),
          );
        }
        break;

      case 'sector':
        if (previousFilter !== 'sector') {
          previousList = companies.filter(a => a.name);
          companies = companies.filter(a => a.sectorId === filter.filter);
          previousFilter = filter.category;
        } else {
          companies = companies.concat(
            previousList.filter(a => a.sectorId === filter.filter),
          );
        }
        break;

      case 'gaol':
        if (previousFilter !== 'goal') {
          previousList = companies.filter(a => a.name);
          companies = companies.filter(a => a.sdgs.includes(filter.filter));
          previousFilter = filter.category;
        } else {
          companies = companies.concat(
            previousList.filter(a => a.sdgs.includes(filter.filter)),
          );
        }
        break;
    }
  }
  return companies;
}

export function sortCompanies(initialCompanies: Company[], sortBy: string) {
  const companies = initialCompanies.concat();
  switch (sortBy) {
    case 'match':
      return companies.sort((a, b) => b.match - a.match);
    case 'matchDsc':
      return companies.sort((a, b) => a.match - b.match);
    case 'name':
      return companies.sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    case 'nameDsc':
      return companies.sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (nameA < nameB) {
          return 1;
        }
        if (nameA > nameB) {
          return -1;
        }
        return 0;
      });
    case 'size':
      return companies.sort((a, b) => b.employees - a.employees);
    case 'sizeDsc':
      return companies.sort((a, b) => a.employees - b.employees);
    default:
      return companies;
  }
}
