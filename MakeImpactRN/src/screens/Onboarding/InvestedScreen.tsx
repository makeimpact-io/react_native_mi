import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  MainTextWhite,
  MIGreen,
  OnboardingBackgroundColors,
} from '../../assets/styles';

import LinearGradient from 'react-native-linear-gradient';
import { Header } from '../../components/Text/Header';
import { SecondaryText } from '../../components/Text/SecondaryText';
import { SafeAreaView } from 'react-native-safe-area-context';
import { OnboardingBottomNavigation } from '../../components/NavigationBars/OnboardingBottomNavigation';
import { connect } from 'react-redux';
import { setInvested } from '../../state/tempUser/tempUserSlice';
import { AppState } from '../../state/store';
import { NativeStackNavigationHelpers } from '@react-navigation/native-stack/lib/typescript/src/types';
import { Black } from '../../assets/styles/RegularTheme';
import { SelectionButton } from '../../components';
import Invested from '../../utils/enums/Invested';
import { updateInvested } from '../../api/firebase/user';
import { setRegistering } from '../../state/app/appSlice';

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {
    route: any;
    navigation: NativeStackNavigationHelpers;
  };

const InvestedScreen = (props: Props) => {
  return (
    <LinearGradient
      colors={OnboardingBackgroundColors}
      style={styles.background}>
      <SafeAreaView style={styles.container}>
        <Header text={"What's your investing experience?"} />
        <SecondaryText
          text={'Help us to guide you through your investment journey.'}
        />
        <View style={styles.selectionButton}>
          <SelectionButton
            content={Invested.Experienced}
            backgroundColor={MainTextWhite}
            textColor={Black}
            backgroundColorSelected={MIGreen}
            textColorSelected={MainTextWhite}
            onClick={() => props.setInvested(Invested.Experienced)}
            selected={props.investedStage === Invested.Experienced}
          />
        </View>
        <View style={styles.selectionButton}>
          <SelectionButton
            content={Invested.Little}
            backgroundColor={MainTextWhite}
            textColor={Black}
            backgroundColorSelected={MIGreen}
            textColorSelected={MainTextWhite}
            onClick={() => props.setInvested(Invested.Little)}
            selected={props.investedStage === Invested.Little}
          />
        </View>
        <View style={styles.selectionButton}>
          <SelectionButton
            content={Invested.None}
            backgroundColor={MainTextWhite}
            textColor={Black}
            backgroundColorSelected={MIGreen}
            textColorSelected={MainTextWhite}
            onClick={() => props.setInvested(Invested.None)}
            selected={props.investedStage === Invested.None}
          />
        </View>
      </SafeAreaView>
      <OnboardingBottomNavigation
        navigation={props.navigation}
        nextPage={props.route.params.nextScreen}
        disabled={props.investedStage === null}
        onClick={() => {
          updateInvested(
            props.investedStage ? props.investedStage : Invested.None,
          );
          setRegistering(false);
        }}
        goBack={true}
      />
    </LinearGradient>
  );
};

const mapStateToProps = (state: AppState) => ({
  investedStage: state.tempUserReducer.invested,
});

const mapDispatchToProps = {
  setInvested,
  setRegistering,
};

const InvestedScreenConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(InvestedScreen);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    width: '90%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  selectionButton: {
    width: '90%',
    height: 50,
    marginVertical: 10,
  },
});

export { InvestedScreenConnected as InvestedScreen };
