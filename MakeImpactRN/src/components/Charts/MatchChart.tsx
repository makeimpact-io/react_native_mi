import React from 'react';
import { StyleSheet, View } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { MIGreen, White } from '../../assets/styles/RegularTheme';

const chartConfig = {
  backgroundGradientFromOpacity: 0,
  backgroundGradientToOpacity: 0,
  fillShadowGradientFrom: MIGreen,
  fillShadowGradientFromOpacity: 1,
  fillShadowGradientTo: White,
  fillShadowGradientToOpacity: 0.3,
  decimalPlaces: 0,
  strokeWidth: 10,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
};

export const MatchChart = (props: { match: number }) => {
  let color = '';
  if (props.match <= 20) {
    color = '#FF0000';
  } else if (props.match <= 40) {
    color = '#BF3300';
  } else if (props.match <= 60) {
    color = '#d3c14b';
  } else if (props.match <= 80) {
    color = '#409900';
  } else if (props.match <= 100) {
    color = '#00CC00';
  }
  const data = [
    {
      match: 100 - props.match,
      color: 'transparent',
    },
    {
      match: props.match,
      color: color,
    },
  ];

  if (Number.isInteger(props.match)) {
    return (
      <View style={styles.container}>
        <PieChart
          data={data}
          width={40}
          height={40}
          chartConfig={chartConfig}
          accessor={'match'}
          backgroundColor={'transparent'}
          paddingLeft={'10'}
          hasLegend={false}
          absolute={true}
        />
      </View>
    );
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
