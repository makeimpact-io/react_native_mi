import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import { NativeStackHeaderProps } from '@react-navigation/native-stack/lib/typescript/src/types';
import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  SafeAreaView,
  TouchableNativeFeedback,
} from 'react-native';
import { signOut } from '../../api/firebase/auth';
import { HeaderColor, MainTextWhite } from '../../assets/styles';

export const TopNavigationBar = (props: {
  navigation: NativeStackHeaderProps | BottomTabHeaderProps;
}) => {
  return (
    <SafeAreaView style={styles.container}>
      {props.navigation.navigation.canGoBack() ? (
        <View style={styles.itemContainer}>
          <TouchableWithoutFeedback
            onPress={() => props.navigation.navigation.goBack()}>
            <Text style={styles.goBackIcon}>{'<='}</Text>
          </TouchableWithoutFeedback>
        </View>
      ) : (
        <View style={styles.itemContainer} />
      )}
      <Text style={styles.miLogo}>m!</Text>
      <TouchableNativeFeedback style={styles.itemContainer} onPress={signOut}>
        <Text style={styles.profilePicture}>CT</Text>
      </TouchableNativeFeedback>
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
  goBackIcon: {
    paddingLeft: 10,
    color: MainTextWhite,
  },
  itemContainer: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignContent: 'center',
  },
  profilePicture: {
    color: MainTextWhite,
  },
  miLogo: {
    color: MainTextWhite,
    fontFamily: 'Inter',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
