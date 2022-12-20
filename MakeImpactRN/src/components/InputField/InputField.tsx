import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';
import { MainTextWhite, TertiaryText } from '../../assets/styles';
import { Black } from '../../assets/styles/RegularTheme';

export const InputField = (props: {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;
  isPassword?: boolean;
  error?: boolean;
  errorText?: string;
}) => {
  const [finishedEditing, setFinishedEditing] = useState(false);

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={styles.container}
      contentContainerStyle={styles.container}>
      {props.error && finishedEditing ? (
        <Text style={styles.errorMessage}>{props.errorText}</Text>
      ) : (
        <Text style={styles.errorMessage} />
      )}
      <TextInput
        placeholder={props.placeholder}
        value={props.value}
        onChangeText={text => props.onChangeText(text)}
        keyboardType={props.keyboardType}
        maxLength={30}
        style={[
          styles.field,
          props.error && finishedEditing ? styles.invalid : null,
        ]}
        placeholderTextColor={TertiaryText}
        secureTextEntry={props.isPassword}
        onEndEditing={() => setFinishedEditing(true)}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
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
    borderWidth: 1.2,
    borderColor: 'white',
  },
  containerContent: {
    width: '100%',
    height: '100%',
  },
  container: {
    width: '100%',
    height: 60,
    display: 'flex',
    justifyContent: 'flex-start',
    alignContent: 'center',
  },
  errorMessage: {
    color: '#ef4857',
    marginLeft: 15,
    paddingBottom: 5,
  },
  invalid: {
    borderColor: '#ef4857',
    borderWidth: 1.2,
  },
});
