import React from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import { Black, MIGreen, MIPink } from '../../assets/styles';
import { ActionButton } from '../Button/ActionButton/ActionButton';

export const ErrorModal = (props: {
  errorMsg: string;
  hideModalText: string;
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
      <View style={styles.centerContainer}>
        <View style={styles.modalView}>
          <View style={styles.contantContainer}>
            <Text style={styles.modalHeader}>{props.errorMsg}</Text>
            <View style={styles.hideModalButtonContainer}>
              <ActionButton
                content={props.hideModalText}
                backgroundColor={MIPink}
                textColor={Black}
                action={props.toggleModal}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '90%',
    backgroundColor: MIGreen,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  contantContainer: {
    width: '80%',
  },
  hideModalButtonContainer: {
    height: 50,
    width: '100%',
    marginBottom: 30,
  },
  modalHeader: {
    textAlign: 'justify',
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'Barlow',
    marginVertical: 20,
    color: MIPink,
    alignSelf: 'baseline',
  },
});
