import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Black, MainTextWhite, MIPink } from '../../assets/styles/RegularTheme';
import { User } from '../../types';

export const ProfileHeader = (props: { user: User }) => {
  return (
    <View style={styles.container}>
      <View style={styles.profilePicture}>
        <Text style={styles.profilePictureText}>
          {props.user.firstName.charAt(0) + props.user.lastName.charAt(0)}
        </Text>
      </View>
      <Text style={styles.userName}>
        {props.user.firstName + ' ' + props.user.lastName}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePicture: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: MIPink,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePictureText: {
    color: Black,
    fontFamily: 'Inter',
    fontSize: 31,
  },
  userName: {
    paddingTop: 10,
    fontSize: 22,
    fontFamily: 'Barlow',
    fontWeight: 'bold',
    color: MainTextWhite,
  },
});
