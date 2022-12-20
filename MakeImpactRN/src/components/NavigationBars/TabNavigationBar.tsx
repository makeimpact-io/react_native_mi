import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import { NativeStackHeaderProps } from '@react-navigation/native-stack/lib/typescript/src/types';
import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableNativeFeedback,
} from 'react-native';
import { CompanyListGrey, MIGreen, White } from '../../assets/styles/index';

export const TabNavigationBar = (props: {
  navigation: NativeStackHeaderProps | BottomTabHeaderProps;
  endPoints: { name: string; route: string }[];
}) => {
  const tabs = props.endPoints.map(endPoint => {
    return (
      <TouchableNativeFeedback
        onPress={() => props.navigation.navigation.navigate(endPoint.route)}
        key={endPoint.name}>
        <View
          style={
            endPoint.route === props.navigation.route.name
              ? [styles.tabContainer, styles.activeTab]
              : styles.tabContainer
          }>
          <Text
            style={
              endPoint.route === props.navigation.route.name
                ? [styles.tabText, styles.activeText]
                : styles.tabText
            }>
            {endPoint.name}
          </Text>
        </View>
      </TouchableNativeFeedback>
    );
  });
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tabsContainer}>{tabs}</View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 80,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: White,
    borderRadius: 25,
  },
  tabContainer: {
    margin: 5,
    padding: 10,
    borderRadius: 20,
    minWidth: 72,
  },
  tabText: {
    fontSize: 12,
    fontFamily: 'Barlow',
    fontWeight: '500',
    textAlign: 'center',
    color: CompanyListGrey,
  },
  activeTab: {
    backgroundColor: MIGreen,
  },
  activeText: {
    color: White,
  },
});
