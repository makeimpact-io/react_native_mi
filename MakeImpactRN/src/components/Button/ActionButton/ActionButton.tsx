import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { TertiaryText } from '../../../assets/styles';
import { Black } from '../../../assets/styles/RegularTheme';

export const ActionButton = (props: {
  content: string;
  backgroundColor: string;
  textColor: string;
  action: () => any;
  disabled?: boolean;
}) => {
  if (props.disabled) {
    return (
      <View style={[style.container, { backgroundColor: TertiaryText }]}>
        <Text style={[style.content, { color: Black }]}>{props.content}</Text>
      </View>
    );
  } else {
    return (
      <TouchableHighlight
        style={[style.container, { backgroundColor: props.backgroundColor }]}
        onPress={() => props.action()}>
        <Text style={[style.content, { color: props.textColor }]}>
          {props.content}
        </Text>
      </TouchableHighlight>
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
