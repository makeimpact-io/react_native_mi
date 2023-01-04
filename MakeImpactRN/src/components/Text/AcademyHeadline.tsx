import React from 'react';
import { StyleSheet, Text, TextStyle } from 'react-native';
import { White } from '../../assets/styles/RegularTheme';

export const AcademyHeadline = (props: {
  text: String;
  icon?: any;
  style?: TextStyle;
}) => {
  return (
    <>
      <Text style={[style.text, props.style]}>{props.text}</Text>
      {props.icon}
    </>
  );
};

const style = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontSize: 25,
    fontFamily: 'Barlow',
    fontWeight: 'bold',
    color: White,
    alignSelf: 'baseline',
  },
});
