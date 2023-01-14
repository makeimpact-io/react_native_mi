import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Black, MainTextWhite } from '../../assets/styles/RegularTheme';

export const CompanyDataTable = (props: {
  data: Map<string, { text: string | undefined; onClick?: () => void }>;
}) => {
  const data = props.data;
  let itemsToRender: any[] = [];
  for (let [key, value] of data) {
    itemsToRender.push(
      <View style={styles.itemContainer} key={key}>
        <Text style={styles.keyText}>{key}</Text>
        <TouchableWithoutFeedback
          style={styles.valueContainer}
          onPress={value.onClick}>
          <Text
            style={
              value.onClick
                ? [styles.valueText, styles.underlined]
                : styles.valueText
            }>
            {value.text ? value.text : 'Unknown'}
          </Text>
        </TouchableWithoutFeedback>
      </View>,
    );
  }
  return <View style={styles.container}>{itemsToRender}</View>;
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 10,
    backgroundColor: MainTextWhite,
  },
  itemContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
  },
  keyText: {
    paddingLeft: 15,
    fontSize: 14,
    fontWeight: 'bold',
    color: Black,
    opacity: 0.35,
  },
  valueContainer: {
    paddingRight: 15,
  },
  valueText: {
    paddingRight: 15,
    fontSize: 14,
    color: Black,
  },
  underlined: {
    textDecorationLine: 'underline',
  },
});
