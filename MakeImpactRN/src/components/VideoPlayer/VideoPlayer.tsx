import React, { useState } from 'react';
import { StyleSheet, Image } from 'react-native';
import Video from 'react-native-video';
import { Black } from '../../assets/styles/RegularTheme';

export const VideoPlayer = (props: { uri: string; cover: string }) => {
  const [showVideo, setShowVideo] = useState(false);

  function onLoaded() {
    setShowVideo(true);
  }
  return (
    <>
      <Video
        source={{
          uri: props.uri,
        }} // Can be a URL or a local file.
        style={!showVideo ? styles.video : [styles.video, styles.display]}
        controls={true}
        onLoad={onLoaded}
      />
      <Image
        style={showVideo ? styles.video : [styles.video, styles.display]}
        source={{ uri: props.cover }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  video: {
    width: '100%',
    height: 200,
    backgroundColor: Black,
    display: 'none',
  },
  display: {
    display: 'flex',
  },
});
