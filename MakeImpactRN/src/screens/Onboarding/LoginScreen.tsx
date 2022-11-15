import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AppBackgroundColors } from '../../assets/styles';

import LinearGradient from 'react-native-linear-gradient';
import { InputField } from '../../components/InputField/InputField';
import { useState } from 'react';

export const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailIsValid, setEmailIsValid] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);

  return (
    <LinearGradient colors={AppBackgroundColors} style={styles.background}>
      <View>
        <Text>Welcome to</Text>
        <Text>m!</Text>
      </View>
      <Text>Hey impactor!</Text>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <InputField
            placeholder={'Email'}
            value={email}
            onChangeText={text => setEmail(text)}
            error={true}
          />
          <InputField
            placeholder={'Password'}
            value={password}
            onChangeText={text => setPassword(text)}
            isPassword={true}
          />
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorContent}>Incorrect Password</Text>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    width: '70%',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  inputContainer: {
    height: 100,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  errorContainer: {
    width: '100%',
  },
  errorContent: {
    width: '100%',
  },
});
