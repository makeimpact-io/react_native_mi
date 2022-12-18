import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { White } from '../../assets/styles';
import { Black } from '../../assets/styles/RegularTheme';
import { Company, Sector } from '../../types';

export const ImpactChampion = (props: {
  company: Company;
  sector: Sector;
  onClick: () => void;
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onClick}>
      <Image
        style={styles.sectorBackground}
        source={{
          uri: props.sector.backgroundLink,
        }}
      />
      <LinearGradient
        colors={['rgba(10, 10, 20, 0)', 'rgba(10, 10, 20, 0.79)', '#0a0a14']}
        style={styles.darkGradient}>
        <View style={styles.infoContainer}>
          <Image
            style={styles.companyLogo}
            source={{
              uri: props.company.logo,
            }}
          />
          <View style={styles.detailsContainer}>
            <Text style={styles.companyName}>{props.company.name}</Text>
            <Text style={styles.sectorName}>{props.sector.name}</Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 240,
    height: 120,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    backgroundColor: Black,
    borderRadius: 10,
    borderColor: White,
    borderWidth: 2,
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
  },
  companyLogo: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: White,
  },
  detailsContainer: {
    paddingLeft: 10,
  },
  companyName: {
    fontFamily: 'Inter',
    fontSize: 18,
    fontWeight: '600',
    color: White,
  },
  sectorName: {
    fontSize: 12,
    fontFamily: 'Inter',
    fontWeight: '500',
    color: White,
  },
  sectorBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    borderRadius: 10,
  },
  darkGradient: {
    flex: 1,
    display: 'flex',
    borderRadius: 10,
  },
});
