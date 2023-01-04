import React from 'react';
import { StyleSheet, Text, TextStyle } from 'react-native';
import { PrimaryGrey } from '../../assets/styles/RegularTheme';

export const SecondaryHeader = (props: { text: String; style?: TextStyle }) => {
  return <Text style={[style.text, props.style]}>{props.text}</Text>;
};

const style = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Inter',
    fontWeight: '500',
    color: PrimaryGrey,
  },
});
