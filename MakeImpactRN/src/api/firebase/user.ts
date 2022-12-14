import firestore from '@react-native-firebase/firestore';
import {
  setInitialUserAdded,
  setSubscribedForUserData,
} from '../../state/app/appSlice';
import store from '../../state/store';
import { resetTempUser } from '../../state/tempUser/tempUserSlice';
import { receiveUser } from '../../state/user/userSlice';
import { User } from '../../types';
import Gender from '../../utils/enums/Gender';
import Invested from '../../utils/enums/Invested';

export const addInitialUser = async (uid: string) => {
  firestore().collection('users').doc(uid).set({
    uid: uid,
    firstName: store.getState().tempUserReducer.firstName,
    lastName: store.getState().tempUserReducer.lastName,
    email: store.getState().tempUserReducer.email,
    gender: null,
    role: 'User',
    invested: null,
    goals: null,
    companies: null,
  });
  store.dispatch(setInitialUserAdded(true));
  store.dispatch(resetTempUser());
};

export const subscribeUserData = async (uid: string | undefined) => {
  if (uid) {
    firestore()
      .collection('users')
      .doc(uid)
      .onSnapshot(
        documentSnapshot => {
          const user = {} as User;
          const data = documentSnapshot.data();
          if (data) {
            user.firstName = data.firstName ? data.firstName : '';
            user.lastName = data.lastName ? data.lastName : '';
            user.age = data.age ? data.age : null;
            user.email = data.email ? data.email : '';
            user.phoneNumber = data.phoneNumber ? data.phoneNumber : null;
            user.uid = uid;
            user.gender = data.gender ? data.gender : null;
            user.invested = data.invested ? data.invested : null;
            user.goals = data.goals ? data.goals : null;
            store.dispatch(receiveUser(user));
          }
        },
        (error: Error) => {
          console.error(error);
        },
      );
    store.dispatch(setSubscribedForUserData(true));
  }
};

export const userExists = async (uid: string | undefined) => {
  const userDoc = await firestore().collection('users').doc(uid).get();
  return userDoc.exists;
};

export const updateGender = async (gender: Gender) => {
  firestore().collection('users').doc(store.getState().userReducer.uid).update({
    gender: gender,
  });
};

export const updateInvested = async (invested: Invested) => {
  firestore().collection('users').doc(store.getState().userReducer.uid).update({
    invested: invested,
  });
};

export const updateGoals = async (goals: string[]) => {
  firestore().collection('users').doc(store.getState().userReducer.uid).update({
    goals: goals,
  });
};
