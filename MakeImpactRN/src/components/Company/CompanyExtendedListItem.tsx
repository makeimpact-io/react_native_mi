import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  White,
  HeaderColor,
  CompanyListGrey,
  Black,
} from '../../assets/styles/RegularTheme';
import { Company, Sector } from '../../types';

export const CompanyExtendedListItem = (props: {
  company: Company;
  sector: Sector;
  onClick: () => void;
}) => {
  const stockPrice =
    props.company.tradingData?.priceLastClose +
    ' ' +
    props.company.tradingData?.currency;

  return (
    <TouchableOpacity style={styles.container} onPress={props.onClick}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.sectorBackground}
          source={{
            uri: props.sector.backgroundLink,
          }}
        />
        <Image
          style={styles.companyLogo}
          source={{
            uri: props.company.logo,
          }}
        />
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.detailsContainer}>
          <Text style={styles.companyName}>{props.company.name}</Text>
          <Text style={styles.stockPrice}>{stockPrice}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 100,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: White,
    borderRadius: 10,
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 10,
  },
  companyLogo: {
    width: 35,
    height: 35,
    marginLeft: 10,
    borderRadius: 20,
    backgroundColor: White,
  },
  detailsContainer: {
    width: '100%',
  },
  companyName: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '600',
    color: HeaderColor,
  },
  stockPrice: {
    fontSize: 12,
    fontFamily: 'Inter',
    fontWeight: '500',
    color: CompanyListGrey,
  },
  imageContainer: {
    backgroundColor: Black,
    width: '100%',
    height: '60%',
    justifyContent: 'center',
  },
  sectorBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
});
