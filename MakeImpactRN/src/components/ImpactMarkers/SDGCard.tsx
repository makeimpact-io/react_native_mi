import React, { useState } from 'react';
import { StyleSheet, Image, TouchableNativeFeedback, View } from 'react-native';
import { White } from '../../assets/styles/RegularTheme';
import { SDG } from '../../types';
import { DescriptionModal } from '../Modals/DescriptionModal';

export const SDGCard = (props: { sdg: SDG }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <View style={styles.container}>
      <TouchableNativeFeedback onPress={() => setShowModal(!showModal)}>
        <View>
          <Image
            style={styles.icon}
            source={{
              uri: props.sdg.blackImageLink,
            }}
          />
          <DescriptionModal
            header={props.sdg.title}
            content={props.sdg.description}
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
    borderColor: White,
    borderWidth: 1,
  },
  container: { paddingHorizontal: 5 },
});
