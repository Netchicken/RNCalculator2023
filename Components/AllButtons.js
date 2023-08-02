import {
  Dimensions, // get the screen dimensions
  StyleSheet, // CSS-like styles
  Text, // Renders text
  TouchableOpacity, // Handles row presses
  Pressable, // Handles row presses
} from 'react-native';
import {React} from 'react';

export const TouchableOpacityButton = ({onPress, text}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export const PressableButton = ({onPress, symbol}) => {
  return (
    <Pressable onPress={() => onPress(symbol)} style={styles.buttonPress}>
      <Text style={styles.textPress}>{symbol}</Text>
    </Pressable>
  );
};

const screen = Dimensions.get('window');
const buttonWidth = screen.width / 4;

const styles = StyleSheet.create({
  button: {
    borderWidth: 3,
    borderColor: '#64dded',
    backgroundColor: '#ffffff',
    flex: 1,
    height: Math.floor(buttonWidth - 55),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Math.floor(buttonWidth),
    margin: 5,
  },
  text: {
    color: '##060606',
    fontSize: 24,
  },

  buttonPress: {
    flex: 1,
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#23e25c',
    backgroundColor: '#f06464',
    alignItems: 'center',
    alignSelf: 'stretch',
    borderRadius: Math.floor(buttonWidth),
    margin: 5,
  },

  textPress: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlignVertical: 'center',
  },
});
