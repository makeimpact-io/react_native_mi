import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import {
  CompanyListGrey,
  MIGreen,
  White,
} from '../../assets/styles/RegularTheme';

export const TabNavigationBar = (
  props: MaterialTopTabBarProps & { isOnCompanyDetails?: boolean },
) => {
  return (
    <View
      style={
        props.isOnCompanyDetails
          ? [styles.container, styles.companyDetailsContainer]
          : styles.container
      }>
      <View style={styles.tabsContainer}>
        {props.state.routes.map((route, index) => {
          const { options } = props.descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = props.state.index === index;

          const onPress = () => {
            const event = props.navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              props.navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            props.navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={
                isFocused
                  ? [styles.tabContainer, styles.activeTab]
                  : [styles.tabContainer]
              }>
              <Text
                style={
                  isFocused
                    ? [styles.tabText, styles.activeText]
                    : [styles.tabText]
                }>
                {label.toString()}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 80,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    zIndex: 1,
  },
  companyDetailsContainer: {
    top: 70,
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
