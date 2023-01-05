import React, { useState } from 'react';
import { StyleSheet, TouchableNativeFeedback, View, Text } from 'react-native';
import { MainText, MainTextWhite } from '../../assets/styles/RegularTheme';
import { SASB } from '../../types';
import { DescriptionModal } from '../Modals/DescriptionModal';

export const SASBCard = (props: { flag: SASB }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <View style={styles.container}>
      <TouchableNativeFeedback onPress={() => setShowModal(!showModal)}>
        <View>
          <View style={styles.icon}>
            <Text style={styles.content}>{props.flag.name}</Text>
          </View>
          <DescriptionModal
            header={props.flag.name}
            content={props.flag.description}
            toggleModal={() => setShowModal(!showModal)}
            showModal={showModal}
          />
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 100,
    height: 100,
    borderRadius: 20,
    backgroundColor: MainText,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: { paddingHorizontal: 5 },
  content: {
    color: MainTextWhite,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Barlow',
  },
});
