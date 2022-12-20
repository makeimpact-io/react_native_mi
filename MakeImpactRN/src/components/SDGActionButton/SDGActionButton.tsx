import React from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';

export const SDGActionButton = (props: {
  onClick: () => any;
  active: boolean;
  activeImage: string;
  inactiveImage: string;
}) => {
  if (props.active) {
    return (
      <TouchableOpacity style={styles.container} onPress={props.onClick}>
        <Image
          style={styles.image}
          source={{
            uri: props.activeImage,
          }}
        />
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => props.onClick()}>
        <Image
          style={styles.image}
          source={{
            uri: props.inactiveImage,
          }}
        />
      </TouchableOpacity>
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
