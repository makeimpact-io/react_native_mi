import * as React from 'react';
import { StyleSheet, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { NativeStackScreenProps } from '@react-navigation/native-stack/lib/typescript/src/types';
import { AppState } from '../../../state/store';
import {
  AppBackgroundColors,
  MainTextWhite,
} from '../../../assets/styles/RegularTheme';
import { AcademyHeadline } from '../../../components';
import PrivacyIcon from '../../../assets/icons/MenuIcons/PrivacyIcon';
import RenderHtml, {
  HTMLElementModel,
  HTMLContentModel,
} from 'react-native-render-html';
import { RootStackNavigationParamList } from '../../../navigation/App/AppContent';

type Props = ReturnType<typeof mapStateToProps> &
  NativeStackScreenProps<RootStackNavigationParamList, 'PrivacyPolicy'>;

const PrivacyPolicyScreen = (props: Props) => {
  const contentSource = {
    html: props.privacyPolicy?.text
      ? props.privacyPolicy?.text
      : 'Something went wrong',
  };

  const customHTMLElementModels = {
    bold: HTMLElementModel.fromCustomModel({
      tagName: 'bold',
      mixedUAStyles: {
        fontWeight: 'bold',
      },
      contentModel: HTMLContentModel.block,
    }),
  };

  return (
    <LinearGradient colors={AppBackgroundColors} style={styles.background}>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <PrivacyIcon width={40} height={40} />
          <AcademyHeadline
            text={
              props.privacyPolicy?.title
                ? props.privacyPolicy?.title
                : 'Something went wrong'
            }
          />
          <RenderHtml
            baseStyle={styles.htmlStyle}
            contentWidth={Dimensions.get('screen').width}
            source={contentSource}
            customHTMLElementModels={customHTMLElementModels}
          />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const mapStateToProps = (state: AppState) => ({
  privacyPolicy: state.dataReducer.texts.find(
    a => a.title === 'Privacy Policy',
  ),
});

const mapDispatchToProps = {};

const PrivacyPolicyScreenConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PrivacyPolicyScreen);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    paddingTop: 80,
  },
  container: {
    flex: 1,
    width: '90%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  htmlStyle: {
    color: MainTextWhite,
  },
  scrollContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export { PrivacyPolicyScreenConnected as PrivacyPolicyScreen };
