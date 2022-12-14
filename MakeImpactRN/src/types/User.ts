import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import Gender from '../utils/enums/Gender';
import Invested from '../utils/enums/Invested';

export interface User {
  fbUser: FirebaseAuthTypes.User | null;
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number | null;
  phoneNumber: string | null;
  gender: Gender | null;
  invested: Invested | null;
  goals: Array<string>;
}
