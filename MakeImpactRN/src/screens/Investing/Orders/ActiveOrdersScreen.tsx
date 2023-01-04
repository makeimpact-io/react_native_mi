import * as React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {
  AppBackgroundColors,
  MainTextWhite,
} from '../../../assets/styles/RegularTheme';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { AppState } from '../../../state/store';
import { fetchActiveOrders } from '../../../api/cloudfunctions/interactiveBrokers';
import { useEffect, useState } from 'react';
import { ActiveOrder } from '../../../types';
import { LoadingScreen } from '../../Utils/LoadingScreen';
import { OrderView } from '../../../components/';
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { OrdersNavigationParamList } from '../../../navigation/App/SubNavigations/OrdersNavigation';

type Props = ReturnType<typeof mapStateToProps> &
  MaterialTopTabScreenProps<OrdersNavigationParamList, 'ActiveOrders'>;

const ActiveOrdersScreen = (props: Props) => {
  const [activeOrders, setActiveOrders] = useState<ActiveOrder[]>([]);
  const [initializing, setInitializing] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  }, []);
  const loadData = async () => {
    const data = await fetchActiveOrders();
    const orders = data.orders as ActiveOrder[];
    setActiveOrders(orders.filter(o => o.status === 'Submitted'));
    setInitializing(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <LinearGradient colors={AppBackgroundColors} style={styles.background}>
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={styles.scroll}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}>
          {initializing ? (
            <LoadingScreen />
          ) : activeOrders.length === 0 ? (
            <Text style={styles.noOrdersMsg}>
              There aren't any currently pending orders, please check the trades
              tab.
            </Text>
          ) : (
            activeOrders.map(order => {
              const company = props.companies.find(
                c => c.conId === order.conid.toString(),
              );
              if (company) {
                return (
                  <OrderView
                    order={order}
                    company={company}
                    key={order.orderId}
                  />
                );
              }
            })
          )}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const mapStateToProps = (state: AppState) => ({
  companies: state.dataReducer.companies,
});

const mapDispatchToProps = {};

const ActiveOrdersScreenConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ActiveOrdersScreen);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    paddingTop: 130,
  },
  container: {
    flex: 1,
    width: '90%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  noOrdersMsg: {
    color: MainTextWhite,
    textAlign: 'center',
    marginTop: 30,
  },
  scroll: {
    width: '100%',
  },
});

export { ActiveOrdersScreenConnected as ActiveOrdersScreen };
