import React, { useEffect, useState } from 'react';
import {
  Modal,
  StyleSheet,
  View,
  TouchableNativeFeedback,
  Text,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Circle from '../../assets/icons/Utils/Circle';
import CloseIcon from '../../assets/icons/Utils/CloseIcon';
import TickedCircle from '../../assets/icons/Utils/TickedCircle';
import {
  AppBackgroundColors,
  MainText,
  MainTextWhite,
  MIGreen,
  MIPink,
  White,
} from '../../assets/styles/RegularTheme';
import { Commitment, SDG, Sector } from '../../types';
import { AcademyHeadline, DefaultButton, FiltersAccordion } from '../';

const sortOptions = [
  { key: 'match', value: 'Match (100 - 0%)' },
  { key: 'matchDsc', value: 'Match (0 - 100%)' },
  { key: 'name', value: 'Name of the company (A - Z)' },
  { key: 'nameDsc', value: 'Name of the company (Z - A)' },
  { key: 'size', value: 'Company size (from low to high)' },
  { key: 'sizeDsc', value: 'Company size (from high to low)' },
];

export const FiltersModal = (props: {
  toggleModal: () => void;
  setSortBy: (text: string) => void;
  setFilters: (filters: { category: string; filter: string }[]) => void;
  filters: { category: string; filter: string }[];
  sortBy: string;
  showModal: boolean;
  commitments: Commitment[];
  sectors: Sector[];
  goals: SDG[];
}) => {
  const [sortBy, setSortBy] = useState<string>(props.sortBy);
  const [sortOptionsRendered, setSortOptionsRendered] = useState<any>();
  const [commitmentsOptionsRendered, setCommitmentsOptionsRendered] =
    useState<any>();
  const [sectorsOptionsRendered, setSectorsOptionsRendered] = useState<any>();
  const [goalsOptionsRendered, setGoalsOptionsRendered] = useState<any>();
  const [filters, setFilters] = useState<
    { category: string; filter: string }[]
  >(props.filters);

  const toggleFilter = (filter: { category: string; filter: string }) => {
    const existingFilter = filters.find(
      f => f.category === filter.category && f.filter === filter.filter,
    );
    if (existingFilter) {
      setFilters(filters.filter(f => f.filter !== filter.filter));
    } else {
      setFilters(filters.concat(filter));
    }
  };

  useEffect(() => {
    setCommitmentsOptionsRendered(
      props.commitments.map(commitment => {
        return (
          <TouchableNativeFeedback
            onPress={() =>
              toggleFilter({ category: 'commitment', filter: commitment.id })
            }
            key={commitment.id}>
            <View style={styles.optionContainer}>
              {filters.find(
                f => f.category === 'commitment' && f.filter === commitment.id,
              ) ? (
                <TickedCircle />
              ) : (
                <Circle />
              )}
              <Text style={styles.optionText}>{commitment.title}</Text>
            </View>
          </TouchableNativeFeedback>
        );
      }),
    );
    setSectorsOptionsRendered(
      props.sectors.map(sector => {
        return (
          <TouchableNativeFeedback
            onPress={() =>
              toggleFilter({ category: 'sector', filter: sector.id })
            }
            key={sector.id}>
            <View style={styles.optionContainer}>
              {filters.find(
                f => f.category === 'sector' && f.filter === sector.id,
              ) ? (
                <TickedCircle />
              ) : (
                <Circle />
              )}
              <Text style={styles.optionText}>{sector.name}</Text>
            </View>
          </TouchableNativeFeedback>
        );
      }),
    );
    setGoalsOptionsRendered(
      props.goals.map(goal => {
        return (
          <TouchableNativeFeedback
            onPress={() => toggleFilter({ category: 'goal', filter: goal.id })}
            key={goal.id}>
            <View style={styles.optionContainer}>
              {filters.find(
                f => f.category === 'goal' && f.filter === goal.id,
              ) ? (
                <TickedCircle />
              ) : (
                <Circle />
              )}
              <Text style={styles.optionText}>{goal.title}</Text>
            </View>
          </TouchableNativeFeedback>
        );
      }),
    );
    setSortOptionsRendered(
      sortOptions.map(sortOption => {
        return (
          <TouchableNativeFeedback
            onPress={() => setSortBy(sortOption.key)}
            key={sortOption.key}>
            <View style={styles.optionContainer}>
              {sortOption.key === sortBy ? <TickedCircle /> : <Circle />}
              <Text style={styles.optionText}>{sortOption.value}</Text>
            </View>
          </TouchableNativeFeedback>
        );
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, props, props.sortBy, sortBy]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.showModal}
      onRequestClose={() => {
        props.toggleModal();
      }}>
      <LinearGradient colors={AppBackgroundColors} style={styles.background}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}>
          <View style={styles.headerContainer}>
            <TouchableNativeFeedback
              onPress={() => {
                props.setFilters([]);
                props.setSortBy('match');
                props.toggleModal();
              }}>
              <CloseIcon width={20} height={20} color={White} />
            </TouchableNativeFeedback>
            <AcademyHeadline text={'Filters'} />
            <View />
          </View>
          <View style={styles.filtersContainer}>
            <FiltersAccordion
              title={'Sort by'}
              children={sortOptionsRendered}
            />
            <FiltersAccordion
              title={'Commitment'}
              children={commitmentsOptionsRendered}
            />
            <FiltersAccordion
              title={'Sector'}
              children={sectorsOptionsRendered}
            />
            <FiltersAccordion
              title={"Value(SDG's)"}
              children={goalsOptionsRendered}
            />
            <View style={styles.buttonContainer}>
              <DefaultButton
                content={'APPLY'}
                backgroundColor={MIPink}
                textColor={MainText}
                action={() => {
                  props.setSortBy(sortBy);
                  props.setFilters(filters);
                  props.toggleModal();
                }}
              />
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '100%',
    height: '100%',
    backgroundColor: MIGreen,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    width: '90%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  background: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    paddingTop: 30,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filtersContainer: {
    marginTop: 80,
  },
  optionContainer: {
    flexDirection: 'row',
    paddingVertical: 6,
  },
  optionText: {
    color: MainTextWhite,
    fontSize: 14,
    fontFamily: 'Inter',
    fontWeight: '500',
    paddingLeft: 10,
  },
  scrollView: {
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    width: '40%',
    height: 40,
    alignSelf: 'center',
    marginVertical: 20,
  },
});
