import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { PrimaryGrey } from '../../assets/styles';

export const SecondaryHeader = (props: { text: String }) => {
  return <Text style={style.text}>{props.text}</Text>;
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
