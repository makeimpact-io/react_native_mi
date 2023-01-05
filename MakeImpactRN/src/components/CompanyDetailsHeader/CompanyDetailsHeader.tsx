import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { CompanyDetailsGrey, White } from '../../assets/styles/RegularTheme';
import { Company, Sector } from '../../types';

export const CompanyDetailsHeader = (props: {
  company: Company;
  sector: Sector;
}) => {
  const stockPrice =
    props.company.tradingData &&
    props.company.tradingData.priceLastClose !== '-'
      ? props.company.tradingData.currency +
        ' ' +
        props.company.tradingData.priceLastClose
      : 'NaN';

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
        <Text
          style={
            props.company.name.length > 8
              ? [styles.companyName, styles.companyLongName]
              : styles.companyName
          }>
          {props.company.name}
        </Text>
        <Text style={styles.sectorName}>{props.sector.name}</Text>
      </View>
      <View style={styles.stockPriceContainer}>
        <Text style={styles.stockPrice}>{stockPrice}</Text>
        {/* <Text style={styles.growthPercent}>%/12M</Text> */}
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
    width: '15%',
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 25,
  },
  companyLogo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: White,
  },
  nameContainer: {
    height: '100%',
    width: '60%',
    display: 'flex',
    paddingLeft: 20,
    justifyContent: 'flex-start',
    alignContent: 'center',
  },
  companyName: {
    fontFamily: 'Inter',
    fontSize: 20,
    fontWeight: '600',
    color: White,
    opacity: 0.8,
  },
  companyLongName: {
    fontSize: 16,
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
    width: '35%',
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
