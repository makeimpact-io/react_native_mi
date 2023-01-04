import React from 'react';
import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native';
import CloseIcon from '../../../assets/icons/Utils/CloseIcon';
import { MainText, MIPink } from '../../../assets/styles/RegularTheme';

export const FilterButton = (props: {
  filterName: string | undefined;
  onClose: () => void;
}) => {
  return (
    <View style={styles.filterContainer}>
      <Text style={styles.text}>{props.filterName}</Text>
      <TouchableNativeFeedback
        onPress={() => props.onClose()}
        style={styles.closeContainer}>
        <CloseIcon width={11} height={11} />
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    borderRadius: 10,
    padding: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    display: 'flex',
    backgroundColor: MIPink,
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'Inter',
    color: MainText,
    paddingRight: 5,
  },
  closeContainer: {
    width: 11,
    height: 11,
  },
});
