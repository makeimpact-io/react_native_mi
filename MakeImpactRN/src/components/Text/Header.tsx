import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { MainTextWhite } from '../../assets/styles';

export const Header = (props: { text: String }) => {
  return <Text style={style.text}>{props.text}</Text>;
};

const style = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontSize: 25,
    fontFamily: 'Barlow',
    fontWeight: '600',
    color: MainTextWhite,
  },
});
