import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { CompanyDetailsGrey, White } from '../../assets/styles/RegularTheme';
import { Company, Sector } from '../../types';

export const CompanyDetailsHeader = (props: {
  company: Company;
  sector: Sector;
}) => {
  return (
    <View style={styles.companyDetails}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.companyLogo}
          source={{
            uri: props.company.logo,
          }}
        />
      </View>
      <View style={styles.nameContainer}>
        <Text style={styles.companyName}>{props.company.name}</Text>
        <Text style={styles.sectorName}>{props.sector.name}</Text>
      </View>
      <View style={styles.stockPriceContainer}>
        <Text style={styles.stockPrice}>
          {props.company.tradingData &&
          props.company.tradingData.priceLastClose !== '-'
            ? props.company.tradingData.currency +
              ' ' +
              props.company.tradingData.priceLastClose
            : 'NaN'}
        </Text>
        <Text style={styles.growthPercent}>%/12M</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
});
