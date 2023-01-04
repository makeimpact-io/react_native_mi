import * as React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  TouchableWithoutFeedback,
  ScrollView,
  Image,
} from 'react-native';
import { AppBackgroundColors, White } from '../../assets/styles/RegularTheme';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { AppState } from '../../state/store';
import { AcademyHeadline, ArticleCard } from '../../components';
import { BottomTabNavigationParamList } from '../../navigation/App/AppContent';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

type Props = ReturnType<typeof mapStateToProps> &
  BottomTabScreenProps<BottomTabNavigationParamList, 'Academy'>;

const HomeScreen = (props: Props) => {
  const categoriesToRender = props.categories.map(category => {
    return (
      <TouchableWithoutFeedback
        onPress={() =>
          props.navigation.getParent()?.navigate('Category', { category })
        }
        key={category.id}>
        <View style={styles.categoryContainer}>
          <AcademyHeadline text={category.name} />
          <View style={styles.categoryImageContainer}>
            <Image
              source={{ uri: category.coverImage }}
              style={styles.categoryImage}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  });
  const trendingArticles = props.articles
    .filter(a => a.trending)
    .map(article => {
      return (
        <ArticleCard
          article={article}
          rectangle={true}
          onClick={() =>
            props.navigation
              .getParent()
              ?.navigate('Article', { article: article })
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
          <View style={styles.contentContainer}>
            <AcademyHeadline text={'m! Spotlight'} />
          </View>
          <View style={styles.trendingScrollContainer}>
            <ScrollView horizontal={true}>{trendingArticles}</ScrollView>
          </View>
          <View style={styles.contentContainer}>{categoriesToRender}</View>
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
    width: '100%',
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
  categoryImageContainer: {
    width: '100%',
    marginTop: 6,
    height: 130,
    borderRadius: 12,
    borderColor: White,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryImage: {
    width: 130,
    height: '100%',
    resizeMode: 'stretch',
  },
  contentContainer: {
    width: '90%',
    alignSelf: 'center',
  },
});

export { HomeScreenConnected as HomeScreen };
