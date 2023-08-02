import {StyleSheet, View} from 'react-native';
import React from 'react';
//in the row component, there is 1 prop that we need, namely: children
export const Row = ({children}) => {
  return <View style={styles.rowcontainer}>{children}</View>;
};

// create styles of Row
const styles = StyleSheet.create({
  rowcontainer: {
    flexDirection: 'row',
    alignContent: 'flex-start',
    flexWrap: 'wrap',
  },
});
