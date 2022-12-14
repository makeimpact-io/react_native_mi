import { NativeStackNavigationHelpers } from '@react-navigation/native-stack/lib/typescript/src/types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MainTextWhite } from '../../assets/styles';
import { Black, MIPink } from '../../assets/styles/RegularTheme';
import { ActionButton } from '../Button/ActionButton/ActionButton';

export const OnboardingBottomNavigation = (props: {
  navigation: NativeStackNavigationHelpers;
  nextPage: string;
  onClick?: () => void;
  disabled?: boolean;
  goBack?: boolean;
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        {props.goBack ? (
          <ActionButton
            content={'Back'}
            backgroundColor={Black}
            textColor={MainTextWhite}
            action={() => props.navigation.goBack()}
          />
        ) : null}
      </View>
      <View style={styles.buttonContainer}>
        <ActionButton
          content={'Continue'}
          backgroundColor={MIPink}
          textColor={Black}
          action={async () => {
            if (props.onClick) {
              await props.onClick();
            }
            if (props.nextPage) {
              props.navigation.navigate(props.nextPage);
            } else {
            }
          }}
          disabled={props.disabled}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 80,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: Black,
  },
  buttonContainer: {
    height: 50,
    width: 100,
  },
});
