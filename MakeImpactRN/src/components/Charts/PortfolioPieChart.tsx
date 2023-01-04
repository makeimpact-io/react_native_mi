import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { VictoryPie } from 'victory-native';
import {
  DeficitColor,
  GrowColor,
  MainTextWhite,
  MIGreen,
  MIPink,
  SecondaryText,
} from '../../assets/styles/RegularTheme';

const screenWidth = Dimensions.get('window').width;

export const PortfolioPieChart = (props: {
  totalValue: string;
  positionChange: string;
  positionChangePercentage: string;
  isProfit: boolean;
  data: { y: string; x: string }[];
  currencySymbol: string;
}) => {
  return (
    <View style={styles.container}>
      <VictoryPie
        data={props.data}
        width={screenWidth}
        height={350}
        innerRadius={85}
        colorScale={[MIGreen, MIPink, '#f2aab6']}
        style={{
          labels: {
            display: 'none',
          },
        }}
      />
      <View style={styles.middleContainer}>
        <Text style={styles.balance}>
          {props.totalValue + ' ' + props.currencySymbol}
        </Text>
        <Text style={styles.valueText}>Total Value</Text>
        <Text
          style={[
            styles.positionChange,
            props.isProfit ? styles.profit : styles.loss,
          ]}>
          {props.positionChange + ' ' + props.currencySymbol}
        </Text>
        <Text
          style={[
            styles.positionChangePercent,
            props.isProfit ? styles.profit : styles.loss,
          ]}>
          {props.positionChangePercentage}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    right: 0,
  },
  balance: {
    fontSize: 26,
    fontWeight: '600',
    fontFamily: 'Inter',
    color: MainTextWhite,
  },
  valueText: {
    fontSize: 14,
    fontFamily: 'Inter',
    color: SecondaryText,
  },
  positionChange: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter',
  },
  positionChangePercent: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Inter',
  },
  profit: {
    color: GrowColor,
  },
  loss: {
    color: DeficitColor,
  },
});
