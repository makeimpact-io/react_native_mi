import * as React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  ScrollView,
  Linking,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { AppState } from '../../state/store';
import { NativeStackScreenProps } from '@react-navigation/native-stack/lib/typescript/src/types';
import {
  AppBackgroundColors,
  Black,
  CompanyDetailsGrey,
  MIGreen,
  MIPink,
  White,
} from '../../assets/styles/RegularTheme';
import { Image } from 'react-native-elements';
import {
  DefaultButton,
  CompanyDataTable,
  SectorHeader,
} from '../../components';
import { RootStackNavigationParamList } from '../../navigation/App/AppContent';

type Props = ReturnType<typeof mapStateToProps> &
  NativeStackScreenProps<RootStackNavigationParamList, 'CompanyPositions'>;

const CompanyStockDataScreen = (props: Props) => {
  const company = props.route.params.company;
  const sector = props.sectors.find(s => s.id === company?.sectorId);
  const shares = props.route.params.stocks;
  const sharePrice = props.route.params.singleStockPrice;
  const marketValue = props.route.params.marketValue;
  const totalReturn = props.route.params.totalReturn;
  const percentageReturn = props.route.params.positionChange;
  const currency = props.route.params.currency;
  const ISIN = company.isin;

  if (sector && company) {
    return (
      <LinearGradient colors={AppBackgroundColors} style={styles.background}>
        <SafeAreaView style={styles.container}>
          <ScrollView
            style={styles.scrollContainer}
            showsVerticalScrollIndicator={false}>
            <View style={styles.companyDetails}>
              <View style={styles.logoContainer}>
                <Image
                  style={styles.companyLogo}
                  source={{
                    uri: company?.logo,
                  }}
                />
              </View>
              <View style={styles.nameContainer}>
                <Text style={styles.companyName}>{company?.name}</Text>
                <Text style={styles.sectorName}>{sector?.name}</Text>
              </View>
            </View>
            <View style={styles.buttonsContainer}>
              <View style={styles.tradingButton}>
                <DefaultButton
                  content={'Invest'}
                  backgroundColor={MIPink}
                  textColor={Black}
                  action={() =>
                    props.navigation.navigate('BuyStock', {
                      company: company,
                      sector: sector,
                    })
                  }
                />
              </View>
              <View style={styles.tradingButton}>
                <DefaultButton
                  content={'Sell'}
                  backgroundColor={MIGreen}
                  textColor={MIPink}
                  action={() =>
                    props.navigation.navigate('SellStock', {
                      company: company,
                      sector: sector,
                      availableStocks: shares,
                    })
                  }
                />
              </View>
            </View>
            <View style={styles.dataSector}>
              <View style={styles.sectorHeaderContainer}>
                <SectorHeader text={'Your Position'} />
              </View>
              <CompanyDataTable
                data={
                  new Map([
                    [
                      'Shares',
                      {
                        text: shares + ' stocks',
                      },
                    ],
                    [
                      'Cost Price',
                      {
                        text: sharePrice + ' ' + currency,
                      },
                    ],
                    [
                      'Market value',
                      {
                        text: marketValue + ' ' + currency,
                      },
                    ],
                    [
                      'Total return',
                      {
                        text: totalReturn + ' ' + currency,
                      },
                    ],
                    [
                      'Return percentage',
                      {
                        text: percentageReturn,
                      },
                    ],
                    [
                      'ISIN',
                      {
                        text: ISIN,
                      },
                    ],
                    [
                      'Currency',
                      {
                        text: currency,
                      },
                    ],
                  ])
                }
              />
            </View>
            <View style={styles.dataSector}>
              <View style={styles.sectorHeaderContainer}>
                <SectorHeader text={'Stock Data'} />
              </View>
              <CompanyDataTable
                data={
                  new Map([
                    [
                      'Open',
                      {
                        text:
                          company.tradingData &&
                          company.tradingData.priceLastClose !== '-' &&
                          company.tradingData.currency
                            ? company.tradingData.priceLastClose +
                              ' ' +
                              company.tradingData.currency
                            : 'Not Available',
                      },
                    ],
                    [
                      'Low',
                      {
                        text:
                          company.tradingData &&
                          company.tradingData.low52 !== '-' &&
                          company.tradingData.currency
                            ? company.tradingData.low52 +
                              ' ' +
                              company.tradingData.currency
                            : 'Not Available',
                      },
                    ],
                    [
                      'High',
                      {
                        text:
                          company.tradingData &&
                          company.tradingData.high52 !== '-' &&
                          company.tradingData.currency
                            ? company.tradingData.high52 +
                              ' ' +
                              company.tradingData.currency
                            : 'Not Available',
                      },
                    ],
                  ])
                }
              />
            </View>
            <View style={styles.dataSector}>
              <View style={styles.sectorHeaderContainer}>
                <SectorHeader text={'Company Data'} />
              </View>
              <CompanyDataTable
                data={
                  new Map([
                    ['Country', { text: company.countryId }],
                    ['Sector', { text: sector.name }],
                    ['Employees', { text: company.employees.toLocaleString() }],
                    [
                      'Website',
                      {
                        text: 'Visit Website',
                        onClick: () => Linking.openURL(company.website),
                      },
                    ],
                    [
                      'Latest Report',
                      {
                        text: 'View Impact Report',
                        onClick: () => Linking.openURL(company.csrLink),
                      },
                    ],
                  ])
                }
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    );
  } else {
    return null;
  }
};

const mapStateToProps = (state: AppState) => ({
  companies: state.dataReducer.companies,
  sectors: state.dataReducer.sectors,
});

const mapDispatchToProps = {};

const CompanyStockDataScreenConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CompanyStockDataScreen);

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
    paddingTop: 30,
  },
  scrollContainer: {
    width: '100%',
  },
  companyDetails: {
    display: 'flex',
    width: '95%',
    height: 80,
    paddingTop: 20,
    marginBottom: 20,
    flexDirection: 'row',
  },
  logoContainer: {
    width: 60,
    height: 60,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 30,
    backgroundColor: White,
  },
  companyLogo: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  nameContainer: {
    height: '100%',
    width: 200,
    display: 'flex',
    paddingLeft: 20,
    justifyContent: 'flex-start',
    alignContent: 'center',
  },
  companyName: {
    fontFamily: 'Inter',
    fontSize: 24,
    fontWeight: '600',
    color: White,
    opacity: 0.8,
  },
  sectorName: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: CompanyDetailsGrey,
  },
  stockPriceContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 15,
  },
  stockPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: White,
  },
  growthPercent: {
    fontSize: 12,
    fontWeight: '500',
    color: CompanyDetailsGrey,
  },
  chartContainer: {
    paddingBottom: 10,
  },
  dataSector: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingVertical: 10,
  },
  sectorHeaderContainer: {
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  tradingButton: {
    width: 100,
    height: 40,
  },
});

export { CompanyStockDataScreenConnected as CompanyStockDataScreen };
