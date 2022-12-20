import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MainText, MainTextWhite } from '../../../assets/styles';

export const MenuNavigationButton = (props: {
  links: { text: string; icon?: any; onClick: () => void }[];
}) => {
  const renderedLinks = props.links.map(link => {
    return (
      <TouchableOpacity
        key={link.text}
        onPress={link.onClick}
        style={styles.link}>
        <View style={styles.linkIconContainer}>{link.icon}</View>
        <Text style={styles.linkText}>{link.text}</Text>
      </TouchableOpacity>
    );
  });
  return <View style={styles.container}>{renderedLinks}</View>;
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    backgroundColor: MainText,
  },
  content: {
    fontSize: 17,
    fontWeight: 'bold',
    fontFamily: 'Barlow',
  },
  link: {
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  linkText: {
    color: MainTextWhite,
    fontSize: 12,
    fontFamily: 'Inter',
    fontWeight: '600',
  },
  linkIconContainer: {
    width: 30,
    height: 30,
    justifyContent: 'center',
  },
});
