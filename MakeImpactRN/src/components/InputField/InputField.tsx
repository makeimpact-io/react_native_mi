import React from 'react';
import { KeyboardTypeOptions, StyleSheet, TextInput } from 'react-native';
import { MainTextWhite, TertiaryText } from '../../assets/styles';
import { Black } from '../../assets/styles/RegularTheme';

export const InputField = (props: {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;
  isPassword?: boolean;
  error?: boolean;
}) => {
  return (
    <TextInput
      placeholder={props.placeholder}
      value={props.value}
      onChangeText={text => props.onChangeText(text)}
      keyboardType={props.keyboardType}
      maxLength={30}
      style={[style.field, props.error ? style.invalid : null]}
      placeholderTextColor={TertiaryText}
      secureTextEntry={props.isPassword}
    />
  );
};

const style = StyleSheet.create({
  field: {
    width: '100%',
    height: 40,
    backgroundColor: MainTextWhite,
    borderRadius: 20,
    fontFamily: 'Inter',
    fontWeight: '500',
    color: Black,
    paddingLeft: 15,
    paddingRight: 15,
  },

  invalid: {
    borderColor: 'red',
    borderWidth: 1.2,
  },
});
