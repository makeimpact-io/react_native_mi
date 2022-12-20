import React from 'react';
import { StyleSheet } from 'react-native';
import Video from 'react-native-video';
import { Black } from '../../assets/styles/RegularTheme';

export const VideoPlayer = (props: { uri: string }) => {
  return (
    <Video
      source={{
        uri: props.uri,
      }} // Can be a URL or a local file.
      style={styles.video}
      controls={true}
      // onBuffer={this.onBuffer}
      // onError={this.videoError}
    />
  );
};

const styles = StyleSheet.create({
  video: {
    width: '100%',
    height: 200,
    backgroundColor: Black,
  },
});
