import React from 'react';
import { StyleSheet, TouchableOpacity, Image, Text, View } from 'react-native';
import { MainTextWhite, White } from '../../assets/styles';
import { AcademyArticle } from '../../types';

export const ArticleView = (props: {
  article: AcademyArticle;
  rectangle?: boolean;
  onClick: () => void;
}) => {
  if (props.rectangle) {
    return (
      <View style={[styles.container, styles.rectangleContainer]}>
        <TouchableOpacity style={styles.imageContainer} onPress={props.onClick}>
          <Image
            style={styles.backgroundImage}
            source={{
              uri: props.article.thumbnailLink,
            }}
          />
          <View style={styles.textContainer}>
            <Text style={styles.rectangleTitle}>{props.article.title}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.imageContainer} onPress={props.onClick}>
          <Image
            style={styles.backgroundImage}
            source={{
              uri: props.article.thumbnailLink,
            }}
          />
        </TouchableOpacity>
        <Text style={styles.title}>{props.article.title}</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    width: 160,
    marginHorizontal: 10,
  },
  imageContainer: {
    width: '100%',
    height: 160,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: White,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    borderRadius: 12,
  },
  title: {
    fontFamily: 'Inter',
    fontSize: 12,
    color: MainTextWhite,
  },
  rectangleContainer: {
    width: 250,
    height: 180,
  },
  textContainer: {
    width: '100%',
    height: '40%',
    borderRadius: 12,
    backgroundColor: 'rgba(10, 10, 20, 0.6)',
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
  },
  rectangleTitle: {
    fontSize: 16,
    color: White,
    fontWeight: '600',
    textAlign: 'left',
    padding: 5,
  },
});
