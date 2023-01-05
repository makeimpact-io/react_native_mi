import * as React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Linking,
  Text,
} from 'react-native';
import {
  AppBackgroundColors,
  MainTextWhite,
} from '../../../assets/styles/RegularTheme';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { AppState } from '../../../state/store';

import { useEffect, useState } from 'react';
import { getStocksData } from '../../../api/firebase/data';
import {
  CompanyDataTable,
  SectorHeader,
  StocksChart,
  CompanyDetailsHeader,
} from '../../../components';
import PartnerIcon from '../../../assets/icons/Utils/PartnerIcon';
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { CompanyDetailsNavigationParamList } from '../../../navigation/App/SubNavigations/CompanyDetailsNavigation';

type Props = ReturnType<typeof mapStateToProps> &
  MaterialTopTabScreenProps<CompanyDetailsNavigationParamList, 'Stocks'>;

const CompanyStockDetails = (props: Props) => {
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
          <CompanyDetailsHeader company={company} sector={sector} />
          <View style={styles.bufferZone} />
          <ScrollView
            style={styles.scrollContainer}
            showsVerticalScrollIndicator={false}>
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
            <View style={styles.partnerContainer}>
              <Text style={styles.partnerText}>
                Financial data provided by our partner
              </Text>
              <PartnerIcon />
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

const CompanyStockDetailsConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CompanyStockDetails);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  },
  bufferZone: {
    height: 40,
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
  partnerContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  partnerText: {
    color: MainTextWhite,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 20,
  },
});

export { CompanyStockDetailsConnected as CompanyStockDetails };
