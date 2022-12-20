import * as React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import { AppBackgroundColors, White } from '../../assets/styles';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { AppState } from '../../state/store';
import { NativeStackNavigationHelpers } from '@react-navigation/native-stack/lib/typescript/src/types';
import { AcademyHeadline, ArticleView } from '../../components';

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {
    route: any;
    navigation: NativeStackNavigationHelpers;
  };

const HomeScreen = (props: Props) => {
  const categoriesToRender = props.categories.map(category => {
    return (
      <TouchableWithoutFeedback
        onPress={() => props.navigation.navigate('Category', { category })}
        key={category.id}>
        <View style={styles.categoryContainer}>
          <AcademyHeadline text={category.name} />
          <View style={styles.categoryImage} />
        </View>
      </TouchableWithoutFeedback>
    );
  });
  const trendingArticles = props.articles
    .filter(a => a.trending)
    .map(article => {
      return (
        <ArticleView
          article={article}
          rectangle={true}
          onClick={() =>
            props.navigation.navigate('Article', { article: article })
          }
          key={article.id}
        />
      );
    });
  return (
    <LinearGradient colors={AppBackgroundColors} style={styles.background}>
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}>
          <AcademyHeadline text={'m! Spotlight'} />
          <View style={styles.trendingScrollContainer}>
            <ScrollView horizontal={true}>{trendingArticles}</ScrollView>
          </View>
          {categoriesToRender}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const mapStateToProps = (state: AppState) => ({
  categories: state.dataReducer.academyCategories,
  articles: state.dataReducer.academyArticles,
});

const mapDispatchToProps = {};

const HomeScreenConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreen);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    width: '90%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  scrollContainer: {
    width: '100%',
  },
  trendingScrollContainer: {
    marginTop: 10,
  },
  categoryContainer: {
    width: '100%',
    marginVertical: 20,
  },
  categoryImage: {
    width: '100%',
    marginTop: 6,
    height: 130,
    borderRadius: 12,
    borderColor: White,
    borderWidth: 2,
  },
});

export { HomeScreenConnected as HomeScreen };
