import * as React from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View, Text } from 'react-native';
import { AppBackgroundColors } from '../../assets/styles';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { AppState } from '../../state/store';
import { NativeStackNavigationHelpers } from '@react-navigation/native-stack/lib/typescript/src/types';
import { AcademyArticle, AcademyCategory } from '../../types';
import { useEffect, useState } from 'react';
import { AcademyHeadline, ArticleView } from '../../components';

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {
    route: any;
    navigation: NativeStackNavigationHelpers;
  };

const CategoryScreen = (props: Props) => {
  const category = props.route.params.category as AcademyCategory;
  const [articles, setArticles] = useState<AcademyArticle[]>([]);

  useEffect(() => {
    setArticles(
      props.articles.filter(article => article.categoryId === category.id),
    );
  }, [category.id, props.articles]);

  if (articles.length === 0) {
    return (
      <LinearGradient colors={AppBackgroundColors} style={styles.background}>
        <SafeAreaView style={styles.container}>
          <ScrollView
            style={styles.scrollContainer}
            showsVerticalScrollIndicator={false}>
            <View style={styles.header} />
            <Text>{category.name}</Text>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    );
  } else {
    const articlesToRender = articles.map(article => {
      return (
        <View style={styles.articleContainer} key={article.id}>
          <ArticleView
            article={article}
            onClick={() =>
              props.navigation.navigate('Article', { article: article })
            }
            key={article.id}
          />
        </View>
      );
    });
    return (
      <LinearGradient colors={AppBackgroundColors} style={styles.background}>
        <SafeAreaView style={styles.container}>
          <ScrollView
            style={styles.scrollContainer}
            showsVerticalScrollIndicator={false}>
            <View style={styles.header} />
            <AcademyHeadline text={category.name} />
            <View style={styles.articlesTable}>{articlesToRender}</View>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    );
  }
};

const mapStateToProps = (state: AppState) => ({
  articles: state.dataReducer.academyArticles,
});

const mapDispatchToProps = {};

const CategoryScreenConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CategoryScreen);

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
  header: {
    height: 150,
    width: '100%',
  },
  articlesTable: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  articleContainer: {
    paddingVertical: 10,
  },
});

export { CategoryScreenConnected as CategoryScreen };
