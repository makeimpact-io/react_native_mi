import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Black, MIPink, MainTextWhite } from '../../assets/styles/RegularTheme';
import { DefaultButton } from '../';

export const OnboardingBottomNavigation = (props: {
  goNextPage?: () => void;
  goBack?: () => void;
  onClick?: () => void;
  disabled?: boolean;
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        {props.goBack !== undefined && (
          <DefaultButton
            content={'Back'}
            backgroundColor={Black}
            textColor={MainTextWhite}
            action={() =>
              props.goBack ? props.goBack() : () => console.log('Error')
            }
          />
        )}
      </View>
      <View style={styles.buttonContainer}>
        <DefaultButton
          content={'Continue'}
          backgroundColor={MIPink}
          textColor={Black}
          action={async () => {
            if (props.onClick) {
              await props.onClick();
            }
            if (props.goNextPage) {
              props.goNextPage();
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
