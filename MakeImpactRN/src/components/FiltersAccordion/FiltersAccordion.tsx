import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MainText, MainTextWhite } from '../../assets/styles/RegularTheme';

export const FiltersAccordion = (props: { title: string; children: any }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <View style={styles.accordion}>
      <TouchableOpacity
        style={styles.row}
        onPress={() => setExpanded(!expanded)}>
        <Text style={styles.title}>{props.title}</Text>
      </TouchableOpacity>
      <View style={styles.parentHr} />
      {expanded && <View style={styles.child}>{props.children}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  accordion: {
    backgroundColor: MainText,
    borderRadius: 5,
    marginVertical: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter',
    color: MainTextWhite,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 56,
    paddingLeft: 25,
    paddingRight: 18,
    alignItems: 'center',
  },
  parentHr: {
    height: 1,
    width: '100%',
  },
  child: {
    padding: 16,
  },
});
