import * as React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  RefreshControl,
  Text,
} from 'react-native';
import { AppBackgroundColors } from '../../assets/styles/RegularTheme';
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
import { resolvePortfolioData } from './helpers/PortfolioHelper';
import { Company, Sector } from '../../types';
import { LoadingScreen } from '../Utils/LoadingScreen';
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { InvestsNavigationParamList } from '../../navigation/App/SubNavigations/InvestNavigation';

type Props = ReturnType<typeof mapStateToProps> &
  MaterialTopTabScreenProps<InvestsNavigationParamList, 'Portfolio'>;

interface UserStockData {
  company: Company | undefined;
  sector: Sector | undefined;
  stocks: Number;
  price: string;
  singlePrice: string;
  totalReturn: string;
  currency: string;
  positionChange: string;
  isProfitable: boolean;
}

const PortfolioScreen = (props: Props) => {
  const [portfolioData, setPortfolioData] = useState();
  const [userBalance, setUserBalance] = useState();
  const [userAccountDetails, setUserAccountDetails] = useState();

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
      let data = [];
      for (let i = 0; i < resolvedData[1].length; i++) {
        const assetAmount = resolvedData[1][i];
        const label = resolvedData[2][i];
        data.push({ y: assetAmount, x: label });
      }
      let currencySymbol = userAccountDetails.map(details => details.currency);
      if (userAccountDetails.map(details => details.currency) == 'EUR') {
        currencySymbol = '€';
      } else if (userAccountDetails.map(details => details.currency) == 'USD') {
        currencySymbol = '$';
      } else if (userAccountDetails.map(details => details.currency) == 'GBP') {
        currencySymbol = '£';
      }
      const userStockData = resolvedData[0] as UserStockData[];
      let portfolioCompaniesData = [];
      for (let i = 0; i < userStockData.length; i++) {
        const data = userStockData[i];
        if (data.company && data.sector) {
          portfolioCompaniesData.push(
            <View style={styles.companyStockContainer} key={data.company.id}>
              <CompanyStockItem
                company={data.company}
                sector={data.sector}
                stocks={data.stocks}
                price={data.price}
                positionChange={data.positionChange}
                isProfitable={data.isProfitable}
                onClick={() =>
                  props.navigation.getParent()?.navigate('CompanyPositions', {
                    company: data.company,
                    stocks: data.stocks,
                    marketValue: data.price,
                    positionChange: data.positionChange,
                    singleStockPrice: data.singlePrice,
                    currency: currencySymbol,
                    totalReturn: data.totalReturn,
                  })
                }
              />
            </View>,
          );
        }
      }

      setPortfolioCompanies(portfolioCompaniesData);
      setChartToShow(
        <PortfolioPieChart
          totalValue={resolvedData[3].toLocaleString('de-DE').split(',')[0]}
          positionChange={resolvedData[4].toLocaleString('de-DE').split(',')[0]}
          positionChangePercentage={resolvedData[5] + '%'}
          isProfit={resolvedData[4] > 0}
          data={data}
          currencySymbol={currencySymbol}
        />,
      );
    }
  }, [
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
          }>
          <View style={styles.balanceContainer}>{chartToShow}</View>
          <View>
            <Text>{userBalance}</Text>
            <Text>Available Cash</Text>
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
  balanceContainer: {},
  portfolioText: {
    width: '100%',
    textAlign: 'left',
  },
  companyStockContainer: {
    marginVertical: 8,
  },
});

export { PortfolioScreenConnected as PortfolioScreen };
