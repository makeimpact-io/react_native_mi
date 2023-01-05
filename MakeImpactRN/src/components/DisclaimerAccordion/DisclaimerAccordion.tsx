import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Black, MIPink } from '../../assets/styles/RegularTheme';

export const DisclaimerAccordion = (props: { disclaimer: string }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <View style={styles.accordion}>
      <TouchableOpacity
        style={styles.row}
        onPress={() => setExpanded(!expanded)}>
        <Text style={styles.title}>Disclaimer:</Text>
        <Text style={styles.disclaimer}>
          {expanded ? props.disclaimer : props.disclaimer.slice(0, 170) + '...'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  accordion: {
    marginVertical: 10,
    backgroundColor: MIPink,
    padding: 16,
    borderRadius: 12,
    flex: 1,
  },
  title: {
    color: Black,
    fontSize: 13,
    fontWeight: 'bold',
    paddingBottom: 8,
    textAlign: 'left',
    width: '100%',
  },
  row: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  disclaimer: {
    color: Black,
    fontSize: 13,
    lineHeight: 18,
    flex: 1,
  },
});
