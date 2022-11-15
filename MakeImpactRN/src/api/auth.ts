import auth from '@react-native-firebase/auth';

export const signupWithEmail = async (email: string, password: string) => {
  let response = '';
  auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      response = 'Success';
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        response = 'Already in use';
      }

      if (error.code === 'auth/invalid-email') {
        response = 'Invalid Email';
      }

      console.error(error);
    });
  console.log(response);

  return response;
};

export const signInWithEmail = async (email: string, password: string) => {
  let response = '';
  auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      response = 'Success';
    })
    .catch(error => {
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
    .then(() => console.log('User signed out!'));
};
