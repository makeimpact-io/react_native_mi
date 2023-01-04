import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { White } from '../../assets/styles/RegularTheme';

export const SectorHeader = (props: { text: String }) => {
  return <Text style={style.text}>{props.text}</Text>;
};

const style = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Inter',
    fontWeight: '600',
    color: White,
  },
});
