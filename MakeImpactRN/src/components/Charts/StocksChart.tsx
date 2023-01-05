import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import {
  MIGreen,
  MIPink,
  PrimaryGrey,
  White,
} from '../../assets/styles/RegularTheme';

const screenWidth = Dimensions.get('window').width;
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

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const StocksChart = (props: { stockData: Map<string, string> }) => {
  const [loading, setLoading] = useState(true);
  const [duration, setDuration] = useState(12);

  const [labels, setLabels] = useState<string[]>([]);
  const [priceData, setPriceData] = useState<number[]>([]);

  useEffect(() => {
    setLoading(true);
    const now = new Date();
    let beginningDate = new Date();
    beginningDate.setMonth(beginningDate.getMonth() - duration);

    let firstLabelDate = new Date(beginningDate);
    let newLabels: string[] = [];

    switch (duration) {
      case 3:
        firstLabelDate = new Date(beginningDate);
        newLabels = [];
        for (let i = 0; i < 7; i++) {
          const date = firstLabelDate.getDate();
          const month = firstLabelDate.getMonth() + 1;
          newLabels.push(date + ' of ' + monthNames[month]);
          firstLabelDate.setDate(firstLabelDate.getDate() + 15);
        }
        setLabels(newLabels);
        break;
      case 6:
        firstLabelDate = new Date(beginningDate);
        newLabels = [];
        for (let i = 0; i < 6; i++) {
          const month = firstLabelDate.getMonth() + 1;
          if (month === 12) {
            newLabels.push(monthNames[0]);
          } else {
            newLabels.push(monthNames[month]);
          }
          firstLabelDate.setMonth(firstLabelDate.getMonth() + 1);
        }
        setLabels(newLabels);
        break;
      case 12:
        firstLabelDate = new Date(beginningDate);
        newLabels = [];
        for (let i = 0; i < 7; i++) {
          const month = firstLabelDate.getMonth();
          newLabels.push(monthNames[month]);
          firstLabelDate.setMonth(firstLabelDate.getMonth() + 2);
        }
        setLabels(newLabels);
        break;
      default:
        break;
    }
    let data: number[] = [];
    for (let [key, value] of props.stockData.entries()) {
      const date = new Date(
        key.slice(0, 4) + '-' + key.slice(4, 6) + '-' + key.slice(6, 8),
      );
      if (date > beginningDate && date < now) {
        data.push(parseFloat(value));
      }
    }
    setPriceData(data);
    setLoading(false);
  }, [duration, props.stockData]);

  if (loading) {
    return null;
  } else {
    const minValue = Math.min(...priceData);
    const maxValue = Math.max(...priceData);
    const data = {
      labels: labels,
      datasets: [
        {
          data: priceData,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          strokeWidth: 2,
        },
        {
          data: [parseInt((minValue - 5).toFixed(0), 10)],
        },
        {
          data: [parseInt((maxValue + 5).toFixed(0), 10)],
        },
      ],
    };
    return (
      <View style={styles.container}>
        {priceData.length < 3 ? (
          <Text style={styles.errorMsg}>
            We don't have enough data to present you this chart. Please select
            another duration.
          </Text>
        ) : (
          <LineChart
            data={data}
            width={screenWidth - 30}
            height={225}
            verticalLabelRotation={20}
            chartConfig={chartConfig}
            withDots={false}
            withInnerLines={false}
            yAxisLabel={'$'}
            yAxisInterval={10}
            bezier
          />
        )}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={
              duration === 3 ? [styles.button, styles.active] : styles.button
            }
            onPress={() => setDuration(3)}>
            <Text style={styles.buttonContent}>3m</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              duration === 6 ? [styles.button, styles.active] : styles.button
            }
            onPress={() => setDuration(6)}>
            <Text style={styles.buttonContent}>6m</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              duration === 12 ? [styles.button, styles.active] : styles.button
            }
            onPress={() => setDuration(12)}>
            <Text style={styles.buttonContent}>1y</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 30,
    height: 30,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    backgroundColor: PrimaryGrey,
  },
  buttonContent: {
    fontSize: 13,
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  active: {
    backgroundColor: MIPink,
  },
  errorMsg: {
    color: White,
    textAlign: 'center',
    padding: 10,
  },
});
