import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export const SelectionButton = (props: {
  content: string;
  backgroundColor: string;
  textColor: string;
  backgroundColorSelected: string;
  textColorSelected: string;
  onClick: () => any;
  selected: boolean;
}) => {
  if (props.selected) {
    return (
      <TouchableOpacity
        style={[
          style.container,
          { backgroundColor: props.backgroundColorSelected },
        ]}
        onPress={props.onClick}>
        <Text style={[style.content, { color: props.textColorSelected }]}>
          {props.content}
        </Text>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        style={[style.container, { backgroundColor: props.backgroundColor }]}
        onPress={props.onClick}>
        <Text style={[style.content, { color: props.textColor }]}>
          {props.content}
        </Text>
      </TouchableOpacity>
    );
  }
};

const style = StyleSheet.create({
  container: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  content: {
    fontSize: 17,
    fontWeight: 'bold',
    fontFamily: 'Barlow',
  },
});
