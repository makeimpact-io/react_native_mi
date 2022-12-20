import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import { NativeStackHeaderProps } from '@react-navigation/native-stack/lib/typescript/src/types';
import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';
import GoBackIcon from '../../assets/icons/Utils/GoBackIcon';
import { HeaderColor, MainTextWhite, MIPink } from '../../assets/styles';
import { Black } from '../../assets/styles/RegularTheme';
import store from '../../state/store';

export const TopNavigationBar = (props: {
  navigation: NativeStackHeaderProps | BottomTabHeaderProps;
  hideGoBack?: boolean;
}) => {
  return (
    <SafeAreaView style={styles.container}>
      {props.navigation.navigation.canGoBack() && !props.hideGoBack ? (
        <View style={[styles.itemContainer, styles.goBackIconContainer]}>
          <TouchableOpacity
            onPress={() => props.navigation.navigation.goBack()}>
            <GoBackIcon />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.itemContainer} />
      )}
      <Text style={styles.miLogo}>m!</Text>
      {store.getState().userReducer.firstName &&
      store.getState().userReducer.lastName ? (
        <TouchableNativeFeedback
          style={styles.itemContainer}
          onPress={() => props.navigation.navigation.navigate('Menu')}>
          <Text style={styles.profilePicture}>
            {store.getState().userReducer.firstName.charAt(0) +
              store.getState().userReducer.lastName.charAt(0)}
          </Text>
        </TouchableNativeFeedback>
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
  goBackIconContainer: {
    marginLeft: 20,
  },
  itemContainer: {
    width: 30,
    height: 30,
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
    marginRight: 20,
    fontSize: 11,
    fontWeight: 'bold',
    fontFamily: 'Inter',
    color: Black,
  },
  miLogo: {
    color: MainTextWhite,
    fontFamily: 'Inter',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
