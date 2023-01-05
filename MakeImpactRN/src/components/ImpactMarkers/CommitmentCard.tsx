import React, { useState } from 'react';
import { StyleSheet, Image, TouchableNativeFeedback, View } from 'react-native';
import { Commitment } from '../../types';
import { DescriptionModal } from '../Modals/DescriptionModal';

export const CommitmentCard = (props: { commitment: Commitment }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <View style={styles.container}>
      <TouchableNativeFeedback onPress={() => setShowModal(!showModal)}>
        <View>
          <Image
            style={styles.icon}
            source={{
              uri: props.commitment.iconLink,
            }}
          />
          <DescriptionModal
            header={props.commitment.title}
            content={props.commitment.description}
            toggleModal={() => setShowModal(!showModal)}
            showModal={showModal}
          />
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: { width: 100, height: 100 },
  container: { paddingHorizontal: 5 },
});
