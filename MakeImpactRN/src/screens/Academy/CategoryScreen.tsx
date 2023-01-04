import * as React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  Dimensions,
} from 'react-native';
import { AppBackgroundColors, White } from '../../assets/styles/RegularTheme';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { AppState } from '../../state/store';
import { NativeStackScreenProps } from '@react-navigation/native-stack/lib/typescript/src/types';
import { AcademyArticle, AcademyCategory } from '../../types';
import { useEffect, useState } from 'react';
import { AcademyHeadline, ArticleCard } from '../../components';
import { RootStackNavigationParamList } from '../../navigation/App/AppContent';

type Props = ReturnType<typeof mapStateToProps> &
  NativeStackScreenProps<RootStackNavigationParamList, 'Category'>;

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
            <Image
              style={styles.headerImage}
              source={{ uri: category.coverImage }}
            />
            <Text>{category.name}</Text>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    );
  } else {
    const articlesToRender = articles.map(article => {
      return (
        <View style={styles.articleContainer} key={article.id}>
          <ArticleCard
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
            <View style={styles.headerContainer}>
              <Image
                style={styles.headerImage}
                source={{ uri: category.coverImage }}
              />
            </View>
            <View style={styles.headlineContainer}>
              <AcademyHeadline text={category.name} />
            </View>
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
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  scrollContainer: {
    width: '100%',
  },
  headerContainer: {
    width: '100%',
    height: 160,
    borderColor: White,
    borderBottomWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerImage: {
    width: 150,
    height: 150,
    resizeMode: 'stretch',
  },
  articlesTable: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'center',
  },
  articleContainer: {
    paddingVertical: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: Dimensions.get('screen').width / 2,
    height: Dimensions.get('screen').width / 2 + 30,
  },
  headlineContainer: {
    paddingLeft: 20,
  },
});

export { CategoryScreenConnected as CategoryScreen };
