import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {
  receiveSDGs,
  receiveCompanies,
  receiveCommitments,
  receiveSASBs,
  receiveSectors,
  calculateCompaniesMatch,
  receiveTradingData,
  assignTradingDataToCompanies,
  receiveAcademyCategories,
  receiveAcademyArticles,
  receiveTexts,
  receiveCountries,
} from '../../state/data/dataSlice';
import store from '../../state/store';
import {
  AcademyArticle,
  AcademyCategory,
  Commitment,
  Company,
  Country,
  SASB,
  SDG,
  Sector,
  Text,
  TradingData,
} from '../../types';

function onError(error: Error) {
  console.error(error);
}

export const initiateRealtimeData = async () => {
  firestore()
    .collection('sdgs')
    .onSnapshot(
      (Snapshot: FirebaseFirestoreTypes.QuerySnapshot) =>
        onResult<SDG>(Snapshot, receiveSDGs),
      onError,
    );
  firestore().collection('companies').onSnapshot(onCompanyResult, onError);
  firestore()
    .collection('commitments')
    .onSnapshot(
      (Snapshot: FirebaseFirestoreTypes.QuerySnapshot) =>
        onResult<Commitment>(Snapshot, receiveCommitments),
      onError,
    );
  firestore()
    .collection('sasbs')
    .onSnapshot(
      (Snapshot: FirebaseFirestoreTypes.QuerySnapshot) =>
        onResult<SASB>(Snapshot, receiveSASBs),
      onError,
    );
  firestore()
    .collection('sectors')
    .onSnapshot(
      (Snapshot: FirebaseFirestoreTypes.QuerySnapshot) =>
        onResult<Sector>(Snapshot, receiveSectors),
      onError,
    );
  firestore()
    .collection('texts')
    .onSnapshot(
      (Snapshot: FirebaseFirestoreTypes.QuerySnapshot) =>
        onResult<Text>(Snapshot, receiveTexts),
      onError,
    );
  firestore()
    .collection('academyArticles')
    .onSnapshot(
      (Snapshot: FirebaseFirestoreTypes.QuerySnapshot) =>
        onResult<AcademyArticle>(Snapshot, receiveAcademyArticles),
      onError,
    );
  firestore()
    .collection('academyCategories')
    .onSnapshot(
      (Snapshot: FirebaseFirestoreTypes.QuerySnapshot) =>
        onResult<AcademyCategory>(Snapshot, receiveAcademyCategories),
      onError,
    );
  firestore()
    .collection('tradingData')
    .onSnapshot(onTradingDataResult, onError);
  firestore().collection('countries').onSnapshot(onCountryResult, onError);
};

function onResult<T>(
  QuerySnapshot: FirebaseFirestoreTypes.QuerySnapshot,
  action: (data: T[]) => any,
) {
  let data = [] as T[];
  for (let i = 0; i < QuerySnapshot.docs.length; i++) {
    const singleData = QuerySnapshot.docs[i].data();
    data.push(singleData as T);
  }
  store.dispatch(action(data));
}

function onCountryResult(QuerySnapshot: FirebaseFirestoreTypes.QuerySnapshot) {
  let data = [] as Country[];
  for (let i = 0; i < QuerySnapshot.docs.length; i++) {
    const singleData = QuerySnapshot.docs[i].data();
    data.push({
      id: singleData.id.toString(),
      name: singleData['Country name'],
    });
  }
  store.dispatch(receiveCountries(data));
}

function onCompanyResult(QuerySnapshot: FirebaseFirestoreTypes.QuerySnapshot) {
  let companies = [] as Company[];
  for (let i = 0; i < QuerySnapshot.docs.length; i++) {
    let company = QuerySnapshot.docs[i].data();
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
  store.dispatch(assignTradingDataToCompanies());
  if (store.getState().userReducer.goals) {
    store.dispatch(calculateCompaniesMatch(store.getState().userReducer.goals));
  }
}

function onTradingDataResult(
  QuerySnapshot: FirebaseFirestoreTypes.QuerySnapshot,
) {
  let tradingDatas = [] as TradingData[];
  for (let i = 0; i < QuerySnapshot.docs.length; i++) {
    const tradingData = QuerySnapshot.docs[i].data();
    tradingDatas.push(tradingData as unknown as TradingData);
  }
  store.dispatch(receiveTradingData(tradingDatas));
  store.dispatch(assignTradingDataToCompanies());
}

export async function getStocksData(isin: string) {
  return await (
    await firestore().collection('stockPriceData').doc(isin).get()
  ).data();
}
