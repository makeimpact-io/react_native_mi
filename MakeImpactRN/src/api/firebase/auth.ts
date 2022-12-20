import auth from '@react-native-firebase/auth';
import { setLoggedIn } from '../../state/app/appSlice';
import store from '../../state/store';
import { resetUser } from '../../state/user/userSlice';

export const signupWithEmail = async (email: string, password: string) => {
  let response = '';
  return await auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      response = 'Success';

      return response;
    })
    .catch((error: { code: string }) => {
      if (error.code === 'auth/email-already-in-use') {
        response = 'Already in use';
      }

      if (error.code === 'auth/invalid-email') {
        response = 'Invalid Email';
      }

      console.error(error);

      return response;
    });
};

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
