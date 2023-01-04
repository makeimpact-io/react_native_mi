import * as React from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { AppBackgroundColors } from '../../assets/styles/RegularTheme';
import LinearGradient from 'react-native-linear-gradient';
import { AcademyHeadline, MenuNavigationButton } from '../../components';
import PrivacyIcon from '../../assets/icons/MenuIcons/PrivacyIcon';
import GoalsIcon from '../../assets/icons/MenuIcons/GoalsIcon';
import CommitmentsIcon from '../../assets/icons/MenuIcons/CommitmentsIcon';
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { MenuNavigationParamList } from '../../navigation/App/SubNavigations/MenuNavigation';

type Props = MaterialTopTabScreenProps<MenuNavigationParamList, 'About'>;

const AboutScreen = (props: Props) => {
  return (
    <LinearGradient colors={AppBackgroundColors} style={styles.background}>
      <SafeAreaView style={styles.container}>
        <AcademyHeadline text={'About m!'} />
        <View style={styles.menuContainer}>
          <MenuNavigationButton
            links={[
              {
                text: 'Privacy Policy',
                onClick: () =>
                  props.navigation.getParent()?.navigate('PrivacyPolicy'),
                icon: <PrivacyIcon />,
              },
            ]}
          />
          <MenuNavigationButton
            links={[
              {
                text: 'Sustainable Development Goals',
                onClick: () => props.navigation.getParent()?.navigate('SDGS'),
                icon: <GoalsIcon />,
              },
              {
                text: 'Commitments',
                onClick: () =>
                  props.navigation.getParent()?.navigate('Commitments'),
                icon: <CommitmentsIcon />,
              },
            ]}
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

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
  menuContainer: {
    marginTop: 30,
    width: '100%',
    height: '40%',
    justifyContent: 'space-between',
  },
});

export { AboutScreen };
