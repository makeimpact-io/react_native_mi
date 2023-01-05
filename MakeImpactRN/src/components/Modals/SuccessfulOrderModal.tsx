import React from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import { Black, MIGreen, MIPink } from '../../assets/styles/RegularTheme';
import { DefaultButton } from '../Button/DefaultButton/DefaultButton';

export const SuccessfulOrderModal = (props: {
  text: string;
  showModal: boolean;
  buttonText: string;
  onClick: () => void;
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.showModal}
      onRequestClose={() => {
        props.onClick();
      }}>
      <View style={styles.centerContainer}>
        <View style={styles.modalView}>
          <View style={styles.contentContainer}>
            <Text style={styles.modalHeader}>{props.text}</Text>
            <View style={styles.hideModalButtonContainer}>
              <DefaultButton
                content={props.buttonText}
                backgroundColor={MIPink}
                textColor={Black}
                action={props.onClick}
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
  contentContainer: {
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
