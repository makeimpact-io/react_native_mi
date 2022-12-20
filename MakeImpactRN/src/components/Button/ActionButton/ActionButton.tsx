import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  ViewStyle,
} from 'react-native';
import { TertiaryText } from '../../../assets/styles';
import { Black } from '../../../assets/styles/RegularTheme';

export const ActionButton = (props: {
  content: string;
  backgroundColor: string;
  textColor: string;
  allCaps?: boolean;
  action: () => any;
  disabled?: boolean;
  style?: ViewStyle;
}) => {
  if (props.allCaps) {
    style.content.fontSize = 14;
  }
  if (props.disabled) {
    return (
      <View
        style={[
          style.container,
          { backgroundColor: TertiaryText },
          props.style,
        ]}>
        <Text style={[style.content, { color: Black }]}>{props.content}</Text>
      </View>
    );
  } else {
    return (
      <TouchableHighlight
        style={[
          style.container,
          { backgroundColor: props.backgroundColor },
          props.style,
        ]}
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
