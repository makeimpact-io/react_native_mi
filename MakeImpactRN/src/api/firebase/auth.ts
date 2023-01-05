import auth from '@react-native-firebase/auth';
import { setLoggedIn } from '../../state/app/appSlice';
import store from '../../state/store';
import { resetUser } from '../../state/user/userSlice';
import firestore from '@react-native-firebase/firestore';

export const signInWithEmail = async (email: string, password: string) => {
  let response = '';
  auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      response = 'Success';
    })
    .catch((error: { code: string }) => {
      if (error.code === 'auth/invalid-email') {
        response = 'Invalid Email';
      }

      if (error.code === 'auth/invalid-password') {
        response = 'Invalid Password';
      }

      console.error(error);
    });
  console.log(response);

  return response;
};

export const signOut = async () => {
  auth()
    .signOut()
    .then(() => store.dispatch(setLoggedIn(false)));
  store.dispatch(resetUser());
};

export const register = async (email: string, password: string) => {
  try {
    return await auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        //Once the user creation has happened successfully, we can add the currentUser into firestore
        //with the appropriate details.
        const uid = auth().currentUser?.uid;
        firestore()
          .collection('users')
          .doc(uid)
          .set({
            uid: uid,
            firstName: '',
            lastName: '',
            email: email,
            gender: null,
            role: 'User',
            invested: null,
            goals: [],
            companies: null,
          })
          //ensure we catch any errors at this stage to advise us if something does go wrong
          .catch(error => {
            console.log(
              'Something went wrong with added user to firestore: ',
              error,
            );
            return error;
          });
      })
      //we need to catch the whole sign up process if it fails too.
      .catch(error => {
        console.log('Something went wrong with sign up: ', error);
        return error;
      });
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const login = async (email: string, password: string) => {
  try {
    await auth().signInWithEmailAndPassword(email, password);
  } catch (e: any) {
    return e;
  }
};

export const passwordReset = async (email: string) => {
  try {
    await auth().sendPasswordResetEmail(email);
  } catch (e) {
    return e;
  }
};

export const logout = async () => {
  try {
    await auth().signOut();
    store.dispatch(resetUser());
  } catch (e) {
    console.log(e);
  }
};
