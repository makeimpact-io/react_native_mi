import * as React from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { MenuNavigationButton, ProfileHeader } from '../../components';
import { connect } from 'react-redux';
import { AppState } from '../../state/store';
import {
  Black,
  MIPink,
  White,
  AppBackgroundColors,
} from '../../assets/styles/RegularTheme';
import SignOutIcon from '../../assets/icons/MenuIcons/SignOutIcon';
import { logout } from '../../api/firebase/auth';
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { MenuNavigationParamList } from '../../navigation/App/SubNavigations/MenuNavigation';

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps &
  MaterialTopTabScreenProps<MenuNavigationParamList, 'Profile'>;

const MenuScreen = (props: Props) => {
  return (
    <LinearGradient colors={AppBackgroundColors} style={styles.background}>
      <SafeAreaView style={styles.container}>
        <ProfileHeader user={props.user} />
        <View style={styles.menuContainer}>
          <MenuNavigationButton
            links={[
              {
                text: 'Sign out',
                onClick: () => logout(),
                icon: <SignOutIcon fill={White} />,
              },
            ]}
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const mapStateToProps = (state: AppState) => ({
  user: state.userReducer,
});

const mapDispatchToProps = {};

const MenuScreenConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MenuScreen);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    paddingTop: 130,
  },
  container: {
    flex: 1,
    width: '90%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  matchesHeaderContainer: {
    alignSelf: 'flex-start',
  },
  headerContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    paddingVertical: 10,
  },
  headerBlack: {
    fontFamily: 'Barlow',
    fontSize: 35,
    fontWeight: 'bold',
    color: Black,
    backgroundColor: MIPink,
    textAlign: 'center',
  },
  headerPink: {
    fontFamily: 'Barlow',
    fontSize: 35,
    fontWeight: 'bold',
    color: MIPink,
    textAlign: 'center',
  },
  scrollStyle: {
    width: '100%',
  },
  companyContainer: {
    paddingVertical: 5,
  },
  menuContainer: {
    marginTop: 30,
    width: '100%',
  },
});

export { MenuScreenConnected as MenuScreen };
