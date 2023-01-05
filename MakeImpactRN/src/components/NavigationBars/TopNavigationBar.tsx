import { NativeStackHeaderProps } from '@react-navigation/native-stack/lib/typescript/src/types';
import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import GoBackIcon from '../../assets/icons/Utils/GoBackIcon';
import {
  HeaderColor,
  MainTextWhite,
  MIPink,
  Black,
} from '../../assets/styles/RegularTheme';
import store from '../../state/store';

export const TopNavigationBar = (props: {
  navigation: NativeStackHeaderProps;
  hideGoBack?: boolean;
}) => {
  return (
    <SafeAreaView style={styles.container}>
      {props.navigation.navigation.canGoBack() && !props.hideGoBack ? (
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => props.navigation.navigation.goBack()}>
          <GoBackIcon style={styles.goBackIcon} />
        </TouchableOpacity>
      ) : (
        <View style={styles.itemContainer} />
      )}
      <Text style={styles.miLogo}>m!</Text>
      {store.getState().userReducer.firstName &&
      store.getState().userReducer.lastName ? (
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => props.navigation.navigation.navigate('Menu')}>
          <Text style={styles.profilePicture}>
            {store.getState().userReducer.firstName.charAt(0) +
              store.getState().userReducer.lastName.charAt(0)}
          </Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.itemContainer} />
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 35,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: HeaderColor,
  },
  itemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  profilePicture: {
    width: 25,
    height: 25,
    borderRadius: 15,
    backgroundColor: MIPink,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 11,
    fontWeight: 'bold',
    fontFamily: 'Inter',
    marginLeft: 60,
    color: Black,
  },
  miLogo: {
    flex: 1,
    color: MainTextWhite,
    fontFamily: 'Inter',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
  goBackIcon: {
    paddingLeft: 50,
  },
});
