import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { White, CompanyListGrey } from '../../assets/styles';
import { Black } from '../../assets/styles/RegularTheme';
import { Company, Sector } from '../../types';

export const CompanyListItem = (props: {
  company: Company;
  sector: Sector;
  match?: string;
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
        <Text style={styles.companyName}>{props.company.name}</Text>
        <Text style={styles.sectorName}>{props.sector.name}</Text>
        <Text style={styles.stockPrice}>
          {props.company.tradingData &&
          props.company.tradingData.priceLastClose !== '-'
            ? props.company.tradingData.currency +
              props.company.tradingData.priceLastClose
            : 'NaN'}
        </Text>
      </View>
      {props.match ? (
        <View style={styles.matchContainer}>
          <Text style={styles.matchText}>{props.match + '% match'}</Text>
        </View>
      ) : null}
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
    paddingBottom: 25,
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
    width: 200,
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
  },
  matchContainer: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
  },
  matchText: {
    fontFamily: 'Inter',
    fontSize: 10,
    fontWeight: '500',
  },
});
