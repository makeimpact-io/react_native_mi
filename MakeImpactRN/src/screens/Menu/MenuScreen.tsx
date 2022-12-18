import * as React from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { AppBackgroundColors } from '../../assets/styles';
import LinearGradient from 'react-native-linear-gradient';
import { MenuNavigationButton, ProfileHeader } from '../../components';
import { connect } from 'react-redux';
import { AppState } from '../../state/store';
import { NativeStackNavigationHelpers } from '@react-navigation/native-stack/lib/typescript/src/types';
import { Black, MIPink, White } from '../../assets/styles/RegularTheme';
import { useContext } from 'react';
import { AuthContext } from '../../navigation/AuthProvider';
import SignOutIcon from '../../assets/icons/MenuIcons/SignOutIcon';

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {
    route: any;
    navigation: NativeStackNavigationHelpers;
  };

const MenuScreen = (props: Props) => {
  const authContext = useContext(AuthContext);
  return (
    <LinearGradient colors={AppBackgroundColors} style={styles.background}>
      <SafeAreaView style={styles.container}>
        <ProfileHeader user={props.user} />
        <View style={styles.menuContainer}>
          <MenuNavigationButton
            links={[
              {
                text: 'Sign out',
                onClick: () => authContext?.logout(),
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
    paddingTop: 100,
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
