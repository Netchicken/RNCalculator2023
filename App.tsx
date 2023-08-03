//import 'react-native-gesture-handler'; //this must be first
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {LoadDB} from './Screen/DbOperations'; //these are the pages I am navigating to
import Calculator from './Screen/Calculator';

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Calculator"
          component={Calculator}
          options={{
            title: 'Cool Calculator',
          }}
        />
        <Stack.Screen
          name="Database"
          component={LoadDB}
          options={{
            title: 'Display the Database data',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
