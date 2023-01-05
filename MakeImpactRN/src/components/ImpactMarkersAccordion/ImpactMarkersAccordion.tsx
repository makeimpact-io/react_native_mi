import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import {
  MainText,
  MainTextWhite,
  MIPink,
} from '../../assets/styles/RegularTheme';

export const ImpactMarkersAccordion = (props: {
  title: string;
  icon: any;
  children: any;
}) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <View style={styles.accordion}>
      <TouchableOpacity
        style={styles.row}
        onPress={() => setExpanded(!expanded)}>
        <View style={styles.iconContainer}>{props.icon}</View>
        <Text style={styles.title}>{props.title}</Text>
      </TouchableOpacity>
      <View style={styles.parentHr} />
      {expanded && <View style={styles.child}>{props.children}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  accordion: {
    borderRadius: 5,
    marginVertical: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'Barlow',
    color: MainTextWhite,
    marginLeft: 20,
  },
  iconContainer: {
    backgroundColor: MIPink,
    height: '100%',
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    backgroundColor: MainText,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    height: 70,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: MIPink,
    alignItems: 'center',
  },
  parentHr: {
    height: 1,
    width: '100%',
  },
  child: {
    paddingVertical: 8,
  },
});
