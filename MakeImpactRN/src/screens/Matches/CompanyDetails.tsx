import * as React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  ScrollView,
  Linking,
} from 'react-native';
import { AppBackgroundColors } from '../../assets/styles/RegularTheme';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { AppState } from '../../state/store';
import { NativeStackScreenProps } from '@react-navigation/native-stack/lib/typescript/src/types';
import { useEffect, useState } from 'react';
import { getStocksData } from '../../api/firebase/data';
import {
  CompanyDataTable,
  SectorHeader,
  StocksChart,
  CompanyDetailsHeader,
} from '../../components';
import { RootStackNavigationParamList } from '../../navigation/App/AppContent';

type Props = ReturnType<typeof mapStateToProps> &
  NativeStackScreenProps<RootStackNavigationParamList, 'CompanyDetails'>;

const CompanyDetails = (props: Props) => {
  const company = props.route.params.company;
  const sector = props.sectors.find(s => s.id === company?.sectorId);
  const [stockData, setStockData] = useState<Map<string, string>>(
    new Map<string, string>(),
  );
  const [chartLoading, setChartLoading] = useState(true);
  useEffect(() => {
    (async () => {
      if (company?.isin) {
        let stocksData = await getStocksData(company?.isin);
        const companyStockData = new Map<string, string>();
        if (stocksData) {
          for (let i = 0; i < stocksData.DateAndPrice.length; i++) {
            const stockInfo = stocksData.DateAndPrice[i];
            companyStockData.set(stockInfo.date, stockInfo.value);
          }
          setStockData(companyStockData);
          setChartLoading(false);
        } else {
        }
        setChartLoading(false);
      }
    })();
  }, [company, company?.isin]);

  if (sector && company) {
    return (
      <LinearGradient colors={AppBackgroundColors} style={styles.background}>
        <SafeAreaView style={styles.container}>
          <ScrollView
            style={styles.scrollContainer}
            showsVerticalScrollIndicator={false}>
            <CompanyDetailsHeader company={company} sector={sector} />
            {/* {showBuyButton && (
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
            )} */}
            <View style={styles.chartContainer}>
              {chartLoading ? (
                <Text>Loading...</Text>
              ) : stockData.size > 0 ? (
                <StocksChart stockData={stockData} />
              ) : (
                <Text>No stock data</Text>
              )}
            </View>
            {company.tradingData &&
            company.tradingData.priceLastClose !== '-' ? (
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
                            company.tradingData.priceLastClose +
                            ' ' +
                            company.tradingData.currency,
                        },
                      ],
                      [
                        'Low',
                        {
                          text:
                            company.tradingData.low52 +
                            ' ' +
                            company.tradingData.currency,
                        },
                      ],
                      [
                        'High',
                        {
                          text:
                            company.tradingData.high52 +
                            ' ' +
                            company.tradingData.currency,
                        },
                      ],
                    ])
                  }
                />
              </View>
            ) : null}

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

const CompanyDetailsConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CompanyDetails);

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
  scrollContainer: {
    width: '100%',
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
  tradingButton: {
    width: 100,
    height: 40,
    marginLeft: 30,
    marginBottom: 20,
  },
});

export { CompanyDetailsConnected as CompanyDetails };
