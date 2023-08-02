import {StyleSheet, View} from 'react-native';
import React from 'react';
// import {Row} from './Row';
import {TouchableOpacityButton} from './AllButtons';
export const NumberButtons = ({updateCalculation}) => {
  return (
    <View>
      <View style={styles.rowcontainer}>
        <TouchableOpacityButton
          style={styles.button}
          text="0"
          onPress={() => updateCalculation('0')}
        />
        <TouchableOpacityButton
          style={styles.button}
          text="1"
          onPress={() => updateCalculation('1')}
        />
        <TouchableOpacityButton
          style={styles.button}
          text="2"
          onPress={() => updateCalculation('2')}
        />
      </View>
      <View style={styles.rowcontainer}>
        <TouchableOpacityButton
          text="3"
          onPress={() => updateCalculation('3')}
        />
        <TouchableOpacityButton
          text="4"
          onPress={() => updateCalculation('4')}
        />
        <TouchableOpacityButton
          text="5"
          onPress={() => updateCalculation('5')}
        />
      </View>
      <View style={styles.rowcontainer}>
        <TouchableOpacityButton
          text="6"
          onPress={() => updateCalculation('6')}
        />
        <TouchableOpacityButton
          text="7"
          onPress={() => updateCalculation('7')}
        />
        <TouchableOpacityButton
          text="8"
          onPress={() => updateCalculation('8')}
        />
      </View>
      <View style={styles.rowcontainer}>
        <TouchableOpacityButton
          text="9"
          onPress={() => updateCalculation('9')}
        />
        <TouchableOpacityButton
          text="."
          onPress={() => updateCalculation('.')}
        />
        <TouchableOpacityButton
          text="Del"
          onPress={() => updateCalculation('del')}
        />
      </View>
      <View style={styles.rowcontainer}>
        <TouchableOpacityButton
          text="="
          onPress={() => updateCalculation('=')}
        />
        <TouchableOpacityButton
          text="Clear"
          onPress={() => updateCalculation('clear')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rowcontainer: {
    flexDirection: 'row',
    alignContent: 'flex-start',
    flexWrap: 'wrap',
  },
});
