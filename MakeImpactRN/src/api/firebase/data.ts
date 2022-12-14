import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {
  receiveSDGs,
  receiveCompanies,
  receiveCommitments,
  receiveSASBs,
  receiveSectors,
} from '../../state/data/dataSlice';
import store from '../../state/store';
import { Commitment, Company, SASB, SDG, Sector } from '../../types';

export const initiateRealtimeData = async () => {
  firestore().collection('sdgs').onSnapshot(onSDGResult, onError);
  firestore().collection('companies').onSnapshot(onCompanyResult, onError);
  firestore().collection('commitments').onSnapshot(onCommitmentResult, onError);
  firestore().collection('sasbs').onSnapshot(onSASBResult, onError);
  firestore().collection('sectors').onSnapshot(onSectorResult, onError);

  function onError(error: Error) {
    console.error(error);
  }
};

function onSDGResult(QuerySnapshot: FirebaseFirestoreTypes.QuerySnapshot) {
  let sdgs = [] as SDG[];
  for (let i = 0; i < QuerySnapshot.docs.length; i++) {
    const sdg = QuerySnapshot.docs[i].data();
    sdgs.push(sdg as unknown as SDG);
  }
  sdgs.sort(sdg => parseInt(sdg.id, 10));
  store.dispatch(receiveSDGs(sdgs));
}

function onCommitmentResult(
  QuerySnapshot: FirebaseFirestoreTypes.QuerySnapshot,
) {
  let commitments = [] as Commitment[];
  for (let i = 0; i < QuerySnapshot.docs.length; i++) {
    const commitment = QuerySnapshot.docs[i].data();
    commitments.push(commitment as unknown as Commitment);
  }
  commitments.sort(commitment => parseInt(commitment.id, 10));
  store.dispatch(receiveCommitments(commitments));
}

function onCompanyResult(QuerySnapshot: FirebaseFirestoreTypes.QuerySnapshot) {
  let companies = [] as Company[];
  for (let i = 0; i < QuerySnapshot.docs.length; i++) {
    const company = QuerySnapshot.docs[i].data();
    companies.push(company as unknown as Company);
  }
  companies.sort((a, b) =>
    a.name.toLowerCase() < b.name.toLowerCase()
      ? -1
      : b.name.toLowerCase() > a.name.toLowerCase()
      ? 1
      : 0,
  );
  store.dispatch(receiveCompanies(companies));
}

function onSASBResult(QuerySnapshot: FirebaseFirestoreTypes.QuerySnapshot) {
  let sasbs = [] as SASB[];
  for (let i = 0; i < QuerySnapshot.docs.length; i++) {
    const sasb = QuerySnapshot.docs[i].data();
    sasbs.push(sasb as unknown as SASB);
  }
  sasbs.sort(sasb => parseInt(sasb.id, 10));
  store.dispatch(receiveSASBs(sasbs));
}

function onSectorResult(QuerySnapshot: FirebaseFirestoreTypes.QuerySnapshot) {
  let sectors = [] as Sector[];
  for (let i = 0; i < QuerySnapshot.docs.length; i++) {
    const sector = QuerySnapshot.docs[i].data();
    sectors.push(sector as unknown as Sector);
  }
  sectors.sort(sector => parseInt(sector.id, 10));
  store.dispatch(receiveSectors(sectors));
}
