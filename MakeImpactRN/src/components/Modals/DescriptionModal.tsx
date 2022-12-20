import React from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import CloseIcon from '../../assets/icons/Utils/CloseIcon';
import { Black, HeaderColor } from '../../assets/styles';

export const DescriptionModal = (props: {
  header: string;
  content: string;
  toggleModal: () => void;
  showModal: boolean;
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.showModal}
      onRequestClose={() => {
        props.toggleModal();
      }}>
      <View style={styles.modalView}>
        <Text style={styles.modalHeader}>{props.header}</Text>
        <Text style={styles.modalText}>{props.content}</Text>
        <TouchableNativeFeedback onPress={props.toggleModal}>
          <CloseIcon />
        </TouchableNativeFeedback>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'justify',
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'Inter',
    lineHeight: 16.7,
    color: HeaderColor,
  },
  modalHeader: {
    textAlign: 'justify',
    fontSize: 19,
    fontWeight: 'bold',
    fontFamily: 'Barlow',
    marginBottom: 10,
    color: Black,
    alignSelf: 'baseline',
  },
});
