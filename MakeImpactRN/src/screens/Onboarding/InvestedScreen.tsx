import * as React from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import {
  MainTextWhite,
  MIGreen,
  OnboardingBackgroundColors,
  Black,
} from '../../assets/styles/RegularTheme';

import LinearGradient from 'react-native-linear-gradient';
import {
  Header,
  SecondaryText,
  OnboardingBottomNavigation,
  SelectionButton,
} from '../../components/';
import { connect } from 'react-redux';
import { NativeStackScreenProps } from '@react-navigation/native-stack/lib/typescript/src/types';
import Invested from '../../utils/enums/Invested';
import { updateInvested } from '../../api/firebase/user';
import { setRegistering } from '../../state/app/appSlice';
import { useState } from 'react';
import { AppState } from '../../state/store';
import InvestingIcon from '../../assets/icons/Onboarding/InvestingIcon';
import { AuthorizedStackParamList } from '../../navigation/AuthContent';

type Props = ReturnType<typeof mapStateToProps> &
  NativeStackScreenProps<AuthorizedStackParamList, 'Invested'>;

const InvestedScreen = (props: Props) => {
  const [invested, setInvested] = useState<Invested | null>(props.invested);
  return (
    <LinearGradient
      colors={OnboardingBackgroundColors}
      style={styles.background}>
      <SafeAreaView style={styles.container}>
        <Header text={"What's your investing experience?"} />
        <SecondaryText
          text={'Help us to guide you through your investment journey.'}
        />
        <InvestingIcon height={120} width={120} style={styles.investingIcon} />
        <View style={styles.selectionButton}>
          <SelectionButton
            content={Invested.Experienced}
            backgroundColor={MainTextWhite}
            textColor={Black}
            backgroundColorSelected={MIGreen}
            textColorSelected={MainTextWhite}
            onClick={() => setInvested(Invested.Experienced)}
            selected={invested === Invested.Experienced}
          />
        </View>
        <View style={styles.selectionButton}>
          <SelectionButton
            content={Invested.Little}
            backgroundColor={MainTextWhite}
            textColor={Black}
            backgroundColorSelected={MIGreen}
            textColorSelected={MainTextWhite}
            onClick={() => setInvested(Invested.Little)}
            selected={invested === Invested.Little}
          />
        </View>
        <View style={styles.selectionButton}>
          <SelectionButton
            content={Invested.None}
            backgroundColor={MainTextWhite}
            textColor={Black}
            backgroundColorSelected={MIGreen}
            textColorSelected={MainTextWhite}
            onClick={() => setInvested(Invested.None)}
            selected={invested === Invested.None}
          />
        </View>
      </SafeAreaView>
      <OnboardingBottomNavigation
        goBack={() => props.navigation.goBack()}
        goNextPage={() => props.navigation.navigate('Goals')}
        disabled={invested === null}
        onClick={() => {
          updateInvested(invested != null ? invested : Invested.None);
        }}
      />
    </LinearGradient>
  );
};

const mapStateToProps = (state: AppState) => ({
  invested: state.userReducer.invested,
});

const mapDispatchToProps = {
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
    marginVertical: 5,
  },
  investingIcon: {
    marginVertical: 15,
  },
});

export { InvestedScreenConnected as InvestedScreen };
