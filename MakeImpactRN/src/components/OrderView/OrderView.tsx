import React, { useState } from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Text,
  Image,
} from 'react-native';
import {
  Black,
  CompanyListGrey,
  DeficitColor,
  MainTextWhite,
  MIGreen,
  SecondaryText,
} from '../../assets/styles/RegularTheme';
import { ActiveOrder, Company } from '../../types';

export const OrderView = (props: { order: ActiveOrder; company: Company }) => {
  const [expanded, setExpanded] = useState(false);
  const executionDate = new Date(props.order.lastExecutionTime_r)
    .toLocaleDateString()
    .split(' ')[0];
  const lastExecutionTime = new Date(props.order.lastExecutionTime_r)
    .toLocaleTimeString()
    .split(' ')[0];
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => setExpanded(!expanded)}
        style={styles.unexpandedContainer}>
        <View style={styles.headerContainer}>
          <Image
            source={{ uri: props.company.logo }}
            style={styles.companyLogo}
          />
          <View style={styles.companyInfoContainer}>
            <Text style={styles.companyName}>
              {props.company.name.slice(0, 12)}
            </Text>
            {props.order.status !== 'Filled' && (
              <Text style={styles.orderStatus}>Active</Text>
            )}
          </View>
          <View style={styles.orderInfoContainer}>
            <Text
              style={
                props.order.side === 'BUY' ? styles.buyOrder : styles.sellOrder
              }>
              {props.order.side}
            </Text>
            <Text style={styles.subDetails}>
              {props.order.sizeAndFills.split('/')[0] + ' Stocks'}
            </Text>
            <Text style={styles.subDetails}>{executionDate}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.parentHr} />
      {expanded && (
        <View style={styles.expandedContent}>
          <Text style={styles.title}>Order Filled</Text>
          <View style={styles.orderInfoData}>
            <Text style={styles.orderInfo}>{props.order.filledQuantity}</Text>
            <Text style={styles.orderInfo}>
              {(
                props.order.filledQuantity * parseFloat(props.order.avgPrice)
              ).toLocaleString() +
                ' ' +
                props.order.cashCcy}
            </Text>
            <Text style={styles.orderInfo}>{lastExecutionTime}</Text>
          </View>
          <Text style={styles.orderProgress}>{props.order.sizeAndFills}</Text>
          <View style={styles.orderExtras}>
            <View>
              <Text style={styles.title}>Currency</Text>
              <Text>{props.order.cashCcy}</Text>
            </View>
            <View>
              <Text style={styles.title}>Order ID</Text>
              <Text>{props.order.orderId}</Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: MainTextWhite,
    borderRadius: 6,
    marginVertical: 5,
  },
  unexpandedContainer: {
    justifyContent: 'center',
    height: 60,
    alignContent: 'center',
  },
  headerContainer: {
    marginVertical: 5,
    width: '95%',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  parentHr: {
    height: 1,
    width: '100%',
  },
  companyLogo: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: MainTextWhite,
    marginRight: 10,
  },
  companyInfoContainer: {
    flex: 4,
  },
  companyName: {
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: '500',
    color: Black,
  },
  orderStatus: {
    fontSize: 12,
    fontFamily: 'Inter',
    fontWeight: '500',
    color: MIGreen,
    borderColor: MIGreen,
    borderRadius: 4,
    borderWidth: 1,
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center',
    paddingHorizontal: 5,
    maxWidth: 60,
  },
  orderInfoContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  buyOrder: {
    color: MIGreen,
    fontSize: 14,
    fontFamily: 'Inter',
    fontWeight: '500',
  },
  sellOrder: {
    color: DeficitColor,
    fontSize: 14,
    fontFamily: 'Inter',
    fontWeight: '500',
  },
  subDetails: {
    fontSize: 12,
    fontFamily: 'Inter',
    fontWeight: '500',
    color: CompanyListGrey,
  },
  expandedContent: {
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 14,
    fontFamily: 'Inter',
    fontWeight: '500',
    color: Black,
  },
  orderInfoData: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  orderInfo: {
    fontSize: 14,
    fontFamily: 'Inter',
    color: CompanyListGrey,
  },
  orderProgress: {
    fontSize: 14,
    fontFamily: 'Inter',
    color: CompanyListGrey,
    borderTopWidth: 1,
    borderStyle: 'solid',
    borderColor: SecondaryText,
    textAlignVertical: 'center',
    marginVertical: 10,
  },
  orderExtras: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
});
