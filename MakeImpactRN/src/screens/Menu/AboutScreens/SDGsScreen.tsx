import * as React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableNativeFeedback,
  Image,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { NativeStackScreenProps } from '@react-navigation/native-stack/lib/typescript/src/types';
import { AppState } from '../../../state/store';
import {
  AppBackgroundColors,
  MainTextWhite,
  TertiaryText,
} from '../../../assets/styles/RegularTheme';
import { AcademyHeadline, DescriptionModal } from '../../../components';
import GoalsIcon from '../../../assets/icons/MenuIcons/GoalsIcon';
import { useState } from 'react';
import { RootStackNavigationParamList } from '../../../navigation/App/AppContent';
type Props = ReturnType<typeof mapStateToProps> &
  NativeStackScreenProps<RootStackNavigationParamList, 'SDGS'>;

const SDGsScreen = (props: Props) => {
  const [sdgToShow, setSdgToShow] = useState(props.sdgs[0]);
  const [showModal, setShowModal] = useState(false);
  let sdgs = props.sdgs
    .map(sdg => {
      return {
        id: parseInt(sdg.id, 10),
        component: (
          <>
            <TouchableNativeFeedback
              style={styles.goal}
              key={sdg.id}
              onPress={() => {
                setSdgToShow(sdg);
                setShowModal(true);
              }}>
              <Image
                source={{ uri: sdg.blackImageLink }}
                style={styles.sdgImage}
              />
            </TouchableNativeFeedback>
          </>
        ),
      };
    })
    .sort((a, b) => a.id - b.id);
  return (
    <LinearGradient colors={AppBackgroundColors} style={styles.background}>
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}>
          <DescriptionModal
            header={sdgToShow.title}
            content={sdgToShow.description}
            toggleModal={() => setShowModal(!showModal)}
            showModal={showModal}
          />
          <GoalsIcon width={40} height={40} />
          <AcademyHeadline text={'Sustainable Development Goals'} />
          <Text style={styles.subtitle}>
            The Sustainable Development Goals are a blueprint to achieve a
            better and more sustainable future. They are also known as the
            Global Goals and were adopted by all the UN Member States in 2015.
          </Text>
          <View style={styles.sdgsContainer}>{sdgs.map(a => a.component)}</View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const mapStateToProps = (state: AppState) => ({
  sdgs: state.dataReducer.sdgs,
});

const mapDispatchToProps = {};

const SDGsScreenConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SDGsScreen);

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
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 80,
  },
  subtitle: {
    color: TertiaryText,
    textAlign: 'center',
  },
  sdgImage: {
    width: (Dimensions.get('screen').width - 80) / 3,
    height: (Dimensions.get('screen').width - 80) / 3,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: MainTextWhite,
    margin: 5,
  },
  goal: {},
  sdgsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
});

export { SDGsScreenConnected as SDGsScreen };
