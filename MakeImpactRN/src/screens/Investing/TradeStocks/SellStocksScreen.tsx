import * as React from 'react';
import { StyleSheet, SafeAreaView, TextInput, Text, View } from 'react-native';
import {
  AppBackgroundColors,
  Black,
  MainText,
  MainTextWhite,
  MIGreen,
  MIPink,
  SecondaryGrey,
  TertiaryText,
  White,
} from '../../../assets/styles/RegularTheme';
import LinearGradient from 'react-native-linear-gradient';
import { CompanyDetailsHeader } from '../../../components/CompanyDetailsHeader/CompanyDetailsHeader';
import { NativeStackScreenProps } from '@react-navigation/native-stack/lib/typescript/src/types';
import { Company, Sector } from '../../../types';
import { useEffect, useState } from 'react';
import {
  fetchAccountBalance,
  fetchPreviewOrder,
  postAnOrder,
} from '../../../api/cloudfunctions/interactiveBrokers';
import {
  DefaultButton,
  ErrorModal,
  SuccessfulOrderModal,
} from '../../../components';
import SwipeButton from 'rn-swipe-button';
import { RootStackNavigationParamList } from '../../../navigation/App/AppContent';

type Props = NativeStackScreenProps<RootStackNavigationParamList, 'SellStock'>;

export const SellStocksScreen = (props: Props) => {
  const company = props.route.params.company as Company;
  const sector = props.route.params.sector as Sector;
  const availableStocks = props.route.params.availableStocks;
  const [stocksToSell, setStocksToSell] = useState(0);
  const [fees, setFees] = useState(0);
  const [estimatedCredit, setEstimatedCredit] = useState(0);
  const [accountID, setAccountID] = useState('');
  const [orderIsConfirmed, setOrderIsConfirmed] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [successfulOrder, setSuccessfulOrder] = useState(false);

  const renderSwipeButton = () => (
    <SwipeButton
      railStyles={styles.swipeRail}
      titleStyles={styles.swipeText}
      thumbIconBackgroundColor={White}
      onSwipeSuccess={executeOrder}
      railBackgroundColor={MIGreen}
      railFillBackgroundColor={MIPink}
      shouldResetAfterSuccess={false}
      title={'SWIPE TO CONFIRM'}
    />
  );

  useEffect(() => {
    const prepareData = async () => {
      const balanceData = await fetchAccountBalance();
      setAccountID(balanceData.BASE.acctcode);
    };
    prepareData();
  }, [company.conId]);

  useEffect(() => {
    if (accountID !== '' && stocksToSell > 0) {
      const previewOrder = async () => {
        const data = await fetchPreviewOrder(
          accountID,
          company.conId,
          stocksToSell,
          'SELL',
        );
        setFees(data.amount.commission);
        setEstimatedCredit(data.amount.total);
      };
      previewOrder();
    }
  }, [accountID, company.conId, stocksToSell]);

  const calculateChanges = (input: any) => {
    try {
      if (!isNaN(parseInt(input, 10))) {
        if (parseInt(input, 10) > availableStocks) {
          setStocksToSell(availableStocks);
        } else {
          setStocksToSell(parseInt(input, 10));
        }
      } else {
        setStocksToSell(0);
      }
    } catch (err) {
      setStocksToSell(0);
    }
  };

  const executeOrder = async () => {
    const data = await postAnOrder(
      accountID,
      company.conId,
      stocksToSell,
      'SELL',
    );
    if (data === 'Error') {
      setShowErrorModal(true);
    } else {
      setSuccessfulOrder(true);
    }
  };

  return (
    <LinearGradient colors={AppBackgroundColors} style={styles.background}>
      <SafeAreaView style={styles.container}>
        <ErrorModal
          errorMsg={'There has been an error, please try again later!'}
          hideModalText={'Try Again'}
          toggleModal={() => setShowErrorModal(!showErrorModal)}
          showModal={showErrorModal}
        />
        <SuccessfulOrderModal
          text={'Congratulations you bought stocks in ' + company.name}
          buttonText={'Track order'}
          onClick={() =>
            props.navigation.navigate('Tabs', {
              screen: 'Invest',
              params: { screen: 'StockOrders' },
            })
          }
          showModal={successfulOrder}
        />
        <CompanyDetailsHeader company={company} sector={sector} />
        <View style={styles.buyStocksContainer}>
          <Text style={styles.headingText}>Total stocks to buy</Text>
          {orderIsConfirmed ? (
            <Text style={styles.input}>{stocksToSell.toString()}</Text>
          ) : (
            <TextInput
              style={styles.input}
              value={stocksToSell.toString()}
              keyboardType={'number-pad'}
              onChangeText={text => calculateChanges(text)}
            />
          )}

          <View style={styles.details}>
            <View style={styles.detailContainer}>
              <Text style={styles.detailTitle}>Available stocks</Text>
              <Text style={styles.detailContent}>{availableStocks}</Text>
            </View>
            <View style={styles.detailContainer}>
              <Text style={styles.detailTitle}>Fees</Text>
              <Text style={styles.detailContent}>{fees}</Text>
            </View>
          </View>
          <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>Estimated Credit</Text>
            <Text style={styles.result}>{estimatedCredit}</Text>
          </View>
          <View style={styles.swipeContainer}>
            {orderIsConfirmed && renderSwipeButton()}
          </View>
        </View>
        {!orderIsConfirmed && (
          <View style={styles.placeOrderButton}>
            <DefaultButton
              content={'PLACE ORDER'}
              backgroundColor={MIPink}
              textColor={Black}
              action={() => setOrderIsConfirmed(true)}
            />
          </View>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    width: '90%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  buyStocksContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: MainText,
    borderRadius: 6,
    marginTop: 30,
  },
  headingText: {
    color: MainTextWhite,
    fontSize: 18,
    fontFamily: 'Inter',
    fontWeight: '600',
    marginTop: 30,
  },
  details: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginVertical: 30,
  },
  detailContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailTitle: {
    color: SecondaryGrey,
    fontSize: 14,
    fontFamily: 'Inter',
  },
  detailContent: {
    color: MainTextWhite,
    fontSize: 20,
    fontFamily: 'Inter',
  },
  resultContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dashed',
    borderTopWidth: 1,
    borderColor: TertiaryText,
    width: '100%',
    paddingVertical: 20,
  },
  resultTitle: {
    color: MainTextWhite,
    fontSize: 18,
    fontFamily: 'Inter',
    fontWeight: '600',
  },
  result: {
    fontSize: 40,
    fontWeight: 'bold',
    color: MIPink,
  },
  input: {
    color: MainTextWhite,
    fontSize: 40,
    fontWeight: '500',
  },
  placeOrderButton: {
    width: '60%',
    marginTop: 20,
    height: 40,
  },
  swipeRail: {},
  swipeText: {
    color: White,
  },
  swipeContainer: {
    width: '90%',
    marginBottom: 10,
  },
});
