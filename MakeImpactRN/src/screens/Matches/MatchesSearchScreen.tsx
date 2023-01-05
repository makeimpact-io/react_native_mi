import * as React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  FlatList,
  TouchableNativeFeedback,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { InputField, SecondaryHeader } from '../../components';
import { connect } from 'react-redux';
import { AppState } from '../../state/store';
import { Company } from '../../types';
import { CompanyListItem } from '../../components/Company/CompanyListItem';
import {
  Black,
  MainTextWhite,
  MIPink,
  AppBackgroundColors,
} from '../../assets/styles/RegularTheme';
import { useEffect, useState } from 'react';
import { FiltersModal } from '../../components/Modals/FiltersModal';
import FiltersIcon from '../../assets/icons/Utils/FiltersIcon';
import { FilterButton } from '../../components/Button/FilterButton/FilterButton';
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { MatchesNavigationParamList } from '../../navigation/App/SubNavigations/MatchesNavigation';
import { filterCompanies, sortCompanies } from './helpers/searchHelper';

type Props = ReturnType<typeof mapStateToProps> &
  MaterialTopTabScreenProps<MatchesNavigationParamList, 'MatchesSearch'>;

const MatchesSearchScreen = (props: Props) => {
  const [renderedFilters, setRenderedFilters] = useState<any>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);
  const [companiesResult, setCompaniesResult] = useState<Set<Company>>(
    new Set<Company>(),
  );
  const [searchInput, setSearchInput] = useState('');
  const [sortBy, setSortBy] = useState<string>('match');
  const [filters, setFilters] = useState<
    { category: string; filter: string }[]
  >([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    let companies = filterCompanies(filters, props.companies);
    setFilteredCompanies(sortCompanies(companies, sortBy));
  }, [filters, props.companies, sortBy]);

  useEffect(() => {
    let companies = filteredCompanies.concat();
    const searchResult = companies.filter(c =>
      c.name.toLowerCase().includes(searchInput.toLowerCase()),
    );
    setCompaniesResult(new Set(searchResult));
  }, [filteredCompanies, filters, props.companies, searchInput]);

  useEffect(() => {
    if (filters.length !== 0) {
      setRenderedFilters(
        filters.map(filter => {
          switch (filter.category) {
            case 'goal':
              return (
                <View style={styles.filterTitleContainer}>
                  <FilterButton
                    key={filter.category + filter.filter}
                    filterName={
                      props.goals.find(g => g.id === filter.filter)?.title
                    }
                    onClose={() =>
                      setFilters(
                        filters.filter(
                          f =>
                            f.category !== filter.category &&
                            f.filter !== filter.filter,
                        ),
                      )
                    }
                  />
                </View>
              );
            case 'sector':
              return (
                <View style={styles.filterTitleContainer}>
                  <FilterButton
                    key={filter.category + filter.filter}
                    filterName={
                      props.sectors.find(s => s.id === filter.filter)?.name
                    }
                    onClose={() =>
                      setFilters(
                        filters.filter(
                          f =>
                            f.category !== filter.category &&
                            f.filter !== filter.filter,
                        ),
                      )
                    }
                  />
                </View>
              );
            case 'commitment':
              return (
                <View style={styles.filterTitleContainer}>
                  <FilterButton
                    key={filter.category + filter.filter}
                    filterName={
                      props.commitments.find(c => c.id === filter.filter)?.title
                    }
                    onClose={() =>
                      setFilters(
                        filters.filter(
                          f =>
                            f.category !== filter.category &&
                            f.filter !== filter.filter,
                        ),
                      )
                    }
                  />
                </View>
              );
          }
        }),
      );
    }
  }, [filters, props.commitments, props.goals, props.sectors]);

  const renderMatches = ({ item }: { item: any }) => {
    const company = item as Company;
    const sector = props.sectors.filter(s => s.id === company.sectorId)[0];
    return (
      <View style={styles.companyContainer} key={company.id}>
        <CompanyListItem
          company={company}
          sector={sector}
          match={company.match >= 0 ? company.match.toFixed(0) : 'Nah'}
          onClick={() =>
            props.navigation
              .getParent()
              ?.navigate('CompanyDetails', { company: company })
          }
        />
      </View>
    );
  };

  return (
    <LinearGradient colors={AppBackgroundColors} style={styles.background}>
      <SafeAreaView style={styles.container}>
        <FiltersModal
          toggleModal={() => setShowFilters(!showFilters)}
          setSortBy={setSortBy}
          setFilters={setFilters}
          filters={filters}
          sortBy={sortBy}
          showModal={showFilters}
          commitments={props.commitments}
          sectors={props.sectors}
          goals={props.goals}
        />
        <View style={styles.searchBarContainer}>
          <InputField
            placeholder={'Search'}
            value={searchInput}
            onChangeText={text => {
              setSearchInput(text);
            }}
          />
        </View>
        <View style={styles.filtersContainer}>
          <TouchableNativeFeedback
            onPress={() => setShowFilters(true)}
            style={styles.filterButtonContainer}>
            <FiltersIcon color={MainTextWhite} />
          </TouchableNativeFeedback>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {renderedFilters}
          </ScrollView>
        </View>
        <View style={styles.matchesHeaderContainer}>
          <SecondaryHeader text={'Results'} />
        </View>
        <FlatList
          style={styles.scrollStyle}
          nestedScrollEnabled={true}
          data={Array.from(companiesResult)}
          renderItem={renderMatches}
          keyExtractor={company => company.id}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

const mapStateToProps = (state: AppState) => ({
  companies: state.dataReducer.companies,
  sectors: state.dataReducer.sectors,
  commitments: state.dataReducer.commitments,
  goals: state.dataReducer.sdgs,
});

const mapDispatchToProps = {};

const MatchesSearchScreenConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MatchesSearchScreen);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    paddingTop: 60,
  },
  container: {
    flex: 1,
    width: '90%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  matchesHeaderContainer: {
    alignSelf: 'flex-start',
  },
  headerContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    paddingVertical: 10,
  },
  headerBlack: {
    fontFamily: 'Barlow',
    fontSize: 35,
    fontWeight: 'bold',
    color: Black,
    backgroundColor: MIPink,
    textAlign: 'center',
  },
  headerPink: {
    fontFamily: 'Barlow',
    fontSize: 35,
    fontWeight: 'bold',
    color: MIPink,
    textAlign: 'center',
  },
  scrollStyle: {
    width: '100%',
  },
  companyContainer: {
    paddingVertical: 5,
  },
  searchBarContainer: {
    width: '80%',
    paddingBottom: 10,
  },
  filtersContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 10,
  },
  filterButtonContainer: {
    width: 30,
    height: 30,
    alignSelf: 'baseline',
  },
  filterTitleContainer: {
    marginHorizontal: 5,
  },
});

export { MatchesSearchScreenConnected as MatchesSearchScreen };
