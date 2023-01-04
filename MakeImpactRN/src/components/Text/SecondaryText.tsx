import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { TertiaryText } from '../../assets/styles/RegularTheme';

export const SecondaryText = (props: { text: String }) => {
  return <Text style={style.text}>{props.text}</Text>;
};

const style = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontSize: 17,
    fontFamily: 'Inter',
    fontWeight: '600',
    color: TertiaryText,
  },
});
