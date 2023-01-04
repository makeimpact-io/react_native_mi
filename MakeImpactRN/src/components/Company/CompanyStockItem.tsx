import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  White,
  CompanyListGrey,
  Black,
  DeficitColor,
  GrowColor,
} from '../../assets/styles/RegularTheme';
import { Company, Sector } from '../../types';

export const CompanyStockItem = (props: {
  company: Company;
  sector: Sector;
  stocks: Number;
  price: string;
  positionChange: string;
  isProfitable: boolean;
  onClick: () => void;
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onClick}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.companyLogo}
          source={{
            uri: props.company.logo,
          }}
        />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.companyName}>
          {props.company.name.slice(
            0,
            props.company.name.length > 18 ? 18 : props.company.name.length,
          ) + (props.company.name.length > 18 ? '...' : '')}
        </Text>
        <Text style={styles.sectorName}>{props.sector.name}</Text>
        <View style={styles.stockPriceContainer}>
          <Text style={styles.stockPrice}>{props.price}</Text>
          <Text
            style={
              props.isProfitable
                ? [styles.stockPrice, styles.stockGrow]
                : [styles.stockPrice, styles.stockDeficit]
            }>
            {props.positionChange}
          </Text>
        </View>
      </View>
      <View style={styles.stocksContainer}>
        <Text style={[styles.stocksText, styles.numberOfStocks]}>
          {props.stocks.toString()}
        </Text>
        <Text style={styles.stocksText}>
          {props.stocks > 1 ? 'Stocks' : 'Stock'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 70,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: White,
    borderRadius: 10,
  },
  logoContainer: {
    width: 40,
    height: 40,
    paddingBottom: 10,
    marginHorizontal: 5,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
  },
  companyLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  detailsContainer: {
    height: '100%',
    width: '60%',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
  },
  companyName: {
    fontFamily: 'Inter',
    fontSize: 18,
    fontWeight: '600',
    color: Black,
    opacity: 0.8,
  },
  sectorName: {
    fontFamily: 'Inter',
    fontSize: 10,
    fontWeight: '500',
    color: CompanyListGrey,
  },
  stockPrice: {
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: 'bold',
    color: Black,
    opacity: 0.8,
    paddingRight: 15,
  },
  stockGrow: {
    color: GrowColor,
  },
  stockDeficit: {
    color: DeficitColor,
  },
  stocksContainer: {
    justifyContent: 'center',
  },
  stocksText: {
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 18,
    fontWeight: '500',
    color: CompanyListGrey,
  },
  numberOfStocks: {
    fontSize: 24,
  },
  stockPriceContainer: {
    flexDirection: 'row',
  },
});
