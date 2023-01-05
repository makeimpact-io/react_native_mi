import * as React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  RefreshControl,
  Text,
} from 'react-native';
import {
  AppBackgroundColors,
  MainTextWhite,
} from '../../assets/styles/RegularTheme';
import LinearGradient from 'react-native-linear-gradient';
import {
  AcademyHeadline,
  CompanyStockItem,
  PortfolioPieChart,
} from '../../components';
import { useEffect, useState } from 'react';
import {
  fetchAccountBalance,
  fetchAccountDetails,
  fetchPortfolio,
} from '../../api/cloudfunctions/interactiveBrokers';
import { connect } from 'react-redux';
import { AppState } from '../../state/store';
import { resolvePortfolioData } from './helpers/portfolioHelper';
import {
  Company,
  PortfolioData,
  Sector,
  UserAccountDetails,
} from '../../types';
import { LoadingScreen } from '../Utils/LoadingScreen';
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { InvestsNavigationParamList } from '../../navigation/App/SubNavigations/InvestNavigation';

type Props = ReturnType<typeof mapStateToProps> &
  MaterialTopTabScreenProps<InvestsNavigationParamList, 'Portfolio'>;

export interface UserStockData {
  company: Company | undefined;
  sector: Sector | undefined;
  stocks: number;
  currentMarketPrice: number;
  averageBoughtPrice: number;
  totalReturn: number;
  currency: string;
  positionChange: number;
  isProfitable: boolean;
}

export interface ResolvedPortfolioData {
  userStockData: UserStockData[];
  stocksMarketValue: number[];
  stocksLabels: string[];
  totalMarketValue: number;
  unrealizedPNL: number;
  calculatePNLPCT: number;
}

const fractionNumber = new Intl.NumberFormat('de-DE', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const PortfolioScreen = (props: Props) => {
  const [portfolioData, setPortfolioData] = useState<PortfolioData[]>();
  const [userBalance, setUserBalance] = useState<number>(0);
  const [userAccountDetails, setUserAccountDetails] =
    useState<UserAccountDetails>();
  const [currencySymbol, setCurrencySymbol] = useState('');

  const [chartToShow, setChartToShow] = useState(<LoadingScreen />);
  const [portfolioCompanies, setPortfolioCompanies] = useState([
    <LoadingScreen />,
  ]);
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  }, []);

  const loadData = async () => {
    setPortfolioData(await fetchPortfolio());
    const balance = await fetchAccountBalance();
    setUserBalance(balance.EUR.cashbalance);
    setUserAccountDetails(await fetchAccountDetails());
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (portfolioData !== undefined && userAccountDetails !== undefined) {
      const resolvedData = resolvePortfolioData(
        portfolioData,
        props.companies,
        props.sectors,
      );

      const preparePieChartData = (
        marketValues: number[],
        labels: string[],
        totalValue: number,
        positionChange: number,
        positionChangePercentage: number,
        isProfit: boolean,
      ) => {
        let pieChartData = [];
        for (let i = 0; i < marketValues.length; i++) {
          const assetAmount = marketValues[i];
          const label = labels[i];
          pieChartData.push({ y: assetAmount.toFixed(2), x: label });
        }
        setChartToShow(
          <PortfolioPieChart
            totalValue={totalValue.toLocaleString('de-DE').split(',')[0]}
            positionChange={
              positionChange.toLocaleString('de-DE').split(',')[0]
            }
            positionChangePercentage={positionChangePercentage.toFixed(2) + '%'}
            isProfit={isProfit}
            data={pieChartData}
            currencySymbol={currencySymbol}
          />,
        );
      };

      preparePieChartData(
        resolvedData.stocksMarketValue,
        resolvedData.stocksLabels,
        resolvedData.totalMarketValue,
        resolvedData.unrealizedPNL,
        resolvedData.calculatePNLPCT,
        resolvedData.unrealizedPNL > 0,
      );
      setCurrencySymbol(userAccountDetails.currency);

      if (userAccountDetails.currency === 'EUR') {
        setCurrencySymbol('€');
      } else if (userAccountDetails.currency === 'USD') {
        setCurrencySymbol('$');
      } else if (userAccountDetails.currency === 'GBP') {
        setCurrencySymbol('£');
      }
      const userStockData = resolvedData.userStockData;
      let portfolioCompaniesRender = [];
      for (let i = 0; i < userStockData.length; i++) {
        const data = userStockData[i];
        if (data.company && data.sector) {
          portfolioCompaniesRender.push(
            <View style={styles.companyStockContainer} key={data.company.id}>
              <CompanyStockItem
                company={data.company}
                sector={data.sector}
                stocks={data.stocks}
                price={fractionNumber.format(data.totalReturn)}
                positionChange={data.positionChange}
                isProfitable={data.isProfitable}
                currency={data.currency}
                onClick={() =>
                  props.navigation.getParent()?.navigate('CompanyPositions', {
                    company: data.company,
                    stocks: data.stocks,
                    marketValue: fractionNumber.format(data.totalReturn),
                    positionChange: data.positionChange.toFixed(2) + '%',
                    singleStockPrice: data.averageBoughtPrice.toFixed(2),
                    currency: currencySymbol,
                    totalReturn: (
                      (data.currentMarketPrice - data.averageBoughtPrice) *
                      data.stocks
                    ).toFixed(2),
                  })
                }
              />
            </View>,
          );
        }
      }

      setPortfolioCompanies(portfolioCompaniesRender);
    }
  }, [
    currencySymbol,
    portfolioData,
    props.companies,
    props.navigation,
    props.sectors,
    userAccountDetails,
  ]);

  return (
    <LinearGradient colors={AppBackgroundColors} style={styles.background}>
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={styles.scroll}
          onScrollToTop={loadData}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}>
          <View>{chartToShow}</View>
          <View style={styles.balanceContainer}>
            <Text style={styles.balance}>
              {userBalance.toLocaleString('de-DE').split(',')[0] +
                currencySymbol}
            </Text>
            <Text style={styles.balanceText}>Available Cash</Text>
          </View>
          <AcademyHeadline text={'My Portfolio'} style={styles.portfolioText} />
          {portfolioCompanies}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const mapStateToProps = (state: AppState) => ({
  companies: state.dataReducer.companies,
  sectors: state.dataReducer.sectors,
});

const mapDispatchToProps = {};

const PortfolioScreenConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PortfolioScreen);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    paddingTop: 80,
  },
  container: {
    flex: 1,
    width: '90%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  scroll: {
    width: '100%',
  },
  balanceContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  balance: {
    color: MainTextWhite,
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Inter',
  },
  balanceText: {
    color: MainTextWhite,
    fontSize: 14,
    fontFamily: 'Inter',
  },
  portfolioText: {
    width: '100%',
    textAlign: 'left',
  },
  companyStockContainer: {
    marginVertical: 8,
  },
});

export { PortfolioScreenConnected as PortfolioScreen };
