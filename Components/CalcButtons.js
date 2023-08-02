import {
  View, //The most fundamental component for building a UI, View is a container that supports layout with flexbox, style, some touch handling, and accessibility controls. https://reactnative.dev/docs/view
  StyleSheet, //StyleSheet.create returns a stylesheet object. https://reactnative.dev/docs/stylesheet
} from 'react-native';

import React from 'react';
import {PressableButton} from './AllButtons';

export const CalcButtons = ({updateCalculation}) => {
  return (
    <View style={styles.rowcontainer}>
      <PressableButton onPress={updateCalculation} symbol="+" />
      <PressableButton onPress={updateCalculation} symbol="*" />
      <PressableButton onPress={updateCalculation} symbol="/" />
      <PressableButton onPress={updateCalculation} symbol="-" />
    </View>
  );
};
const styles = StyleSheet.create({
  rowcontainer: {
    flexDirection: 'row',
    width: '100%', //you need this to see the buttons
    alignContent: 'flex-start',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
