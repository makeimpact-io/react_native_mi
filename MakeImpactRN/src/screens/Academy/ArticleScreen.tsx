import * as React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Dimensions,
} from 'react-native';
import {
  AppBackgroundColors,
  HeaderColor,
  MainTextWhite,
  MIPink,
  SecondaryGrey,
} from '../../assets/styles/RegularTheme';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { AppState } from '../../state/store';
import { NativeStackScreenProps } from '@react-navigation/native-stack/lib/typescript/src/types';
import { AcademyArticle } from '../../types';

import {
  DisclaimerAccordion,
  SectorHeader,
  VideoPlayer,
} from '../../components';
import RenderHtml from 'react-native-render-html';
import { RootStackNavigationParamList } from '../../navigation/App/AppContent';

type Props = ReturnType<typeof mapStateToProps> &
  NativeStackScreenProps<RootStackNavigationParamList, 'Article'>;

const ArticleScreen = (props: Props) => {
  const article = props.route.params.article as AcademyArticle;
  const category = props.categories.filter(a => a.id === article.categoryId)[0];

  const contentSource = {
    html: article.content,
  };
  return (
    <SafeAreaView style={styles.container}>
      <VideoPlayer cover={article.thumbnailLink} uri={article.videoLink} />
      <LinearGradient colors={AppBackgroundColors} style={styles.background}>
        <ScrollView
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}>
          <View style={styles.headLineContainer}>
            <SectorHeader text={article.title} />
          </View>
          <View style={styles.authorContainer}>
            <Text style={styles.authorText}>{'By ' + article.author}</Text>
          </View>
          <View style={styles.categoryContainer}>
            <Text style={styles.categoryText}>{category.name}</Text>
          </View>
          <RenderHtml
            baseStyle={styles.htmlStyle}
            contentWidth={Dimensions.get('screen').width}
            source={contentSource}
          />
          <DisclaimerAccordion disclaimer={article.disclaimer} />
          <View style={styles.endlineContainer}>
            <Text style={styles.endlineText}>make!mpact</Text>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const mapStateToProps = (state: AppState) => ({
  categories: state.dataReducer.academyCategories,
});

const mapDispatchToProps = {};

const ArticleScreenConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArticleScreen);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  container: {
    flex: 1,
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 0,
  },
  scrollContainer: {
    width: '90%',
  },
  headLineContainer: {
    alignItems: 'flex-start',
    paddingVertical: 10,
  },
  authorContainer: {
    alignItems: 'flex-start',
  },
  authorText: {
    fontSize: 12,
    fontFamily: 'Inter',
    color: SecondaryGrey,
  },
  categoryContainer: {
    backgroundColor: MIPink,
    alignSelf: 'flex-start',
    borderRadius: 10,
    marginVertical: 10,
  },
  categoryText: {
    color: HeaderColor,
    fontSize: 12,
    fontWeight: '500',
    padding: 4,
  },
  htmlStyle: {
    color: MainTextWhite,
  },
  endlineContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    margin: 20,
  },
  endlineText: {
    color: MainTextWhite,
    fontFamily: 'Inter',
    alignSelf: 'center',
    fontSize: 20,
  },
});

export { ArticleScreenConnected as ArticleScreen };
