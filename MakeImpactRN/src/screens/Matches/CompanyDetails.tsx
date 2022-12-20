import * as React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  ScrollView,
  Linking,
} from 'react-native';
import { AppBackgroundColors } from '../../assets/styles';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { AppState } from '../../state/store';
import { NativeStackNavigationHelpers } from '@react-navigation/native-stack/lib/typescript/src/types';
import { CompanyDetailsGrey, White } from '../../assets/styles/RegularTheme';
import { Image } from 'react-native-elements';
import { useEffect, useState } from 'react';
import { getStocksData } from '../../api/firebase/data';
import { DataTable, SectorHeader, StocksChart } from '../../components';

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {
    route: any;
    navigation: NativeStackNavigationHelpers;
  };

const CompanyDetails = (props: Props) => {
  const company = props.route.params.company;
  const sector = props.sectors.find(sector => sector.id === company?.sectorId);
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
            const stockData = stocksData.DateAndPrice[i];
            companyStockData.set(stockData.date, stockData.value);
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
              <View style={styles.stockPriceContainer}>
                <Text style={styles.stockPrice}>
                  {company.tradingData &&
                  company.tradingData.priceLastClose !== '-'
                    ? company.tradingData.currency +
                      ' ' +
                      company.tradingData.priceLastClose
                    : 'NaN'}
                </Text>
                <Text style={styles.growthPercent}>%/12M</Text>
              </View>
            </View>
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
                <DataTable
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
              <DataTable
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
});

export { CompanyDetailsConnected as CompanyDetails };
