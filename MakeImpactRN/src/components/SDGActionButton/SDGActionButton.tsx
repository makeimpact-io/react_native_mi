import React from 'react';
import { StyleSheet, Image, TouchableNativeFeedback } from 'react-native';

export const SDGActionButton = (props: {
  onClick: () => any;
  active: boolean;
  activeImage: string;
  inactiveImage: string;
}) => {
  if (props.active) {
    return (
      <TouchableNativeFeedback style={styles.container} onPress={props.onClick}>
        <Image
          style={styles.image}
          source={{
            uri: props.activeImage,
          }}
        />
      </TouchableNativeFeedback>
    );
  } else {
    return (
      <TouchableNativeFeedback
        style={styles.container}
        onPress={() => props.onClick()}>
        <Image
          style={styles.image}
          source={{
            uri: props.inactiveImage,
          }}
        />
      </TouchableNativeFeedback>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 25,
  },
});
