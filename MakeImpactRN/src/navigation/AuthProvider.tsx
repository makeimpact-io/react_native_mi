import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

interface AuthContextInterface {
  user: FirebaseAuthTypes.User | null;
  setUser: Dispatch<SetStateAction<null>>;
  login: (email: string, password: string) => Promise<any>;
  register: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  passwordReset: (email: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextInterface | null>(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email: string, password: string) => {
          try {
            await auth().signInWithEmailAndPassword(email, password);
          } catch (e: any) {
            return e;
          }
        },
        register: async (email: string, password: string) => {
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
                    gender: [],
                    role: 'User',
                    invested: null,
                    goals: null,
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
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            console.log(e);
          }
        },
        passwordReset: async (email: string) => {
          try {
            await auth().sendPasswordResetEmail(email);
          } catch (e) {
            return e;
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
