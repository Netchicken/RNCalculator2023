import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  FlatList,
} from 'react-native';
import {React, useState} from 'react';
import {calcButtons} from './Components/CalcButtons';
import {numberButtons} from './Components/NumberButton';
import {dbButtons} from './Components/DbButtons';
import {GetDb, PassData} from './Operations/DbOperations';

//https://towardsdev.com/how-to-build-a-calculator-app-using-react-native-a-step-by-step-tutorial-40ae327fae5f

const App = () => {
  const [calculation, setCalculation] = useState('');
  let DbDisplay = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      answer: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      answer: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      answer: 'Third Item',
    },
  ];

  const updateCalculation = value => {
    // alert('updateCalculation' + ' ' + value + ' ' + calculation);
    setCalculation(calculation + String(value)); //add the value to the growing string
    console.log('updateCalculation all', calculation);
    //if you press = then evaluate the calculation
    if (value === '=') {
      let calc = calculation;
      // eslint-disable-next-line no-new-func
      let answer = new Function('return ' + calc)();

      setCalculation(calc + '=' + answer);
    }
    if (value === 'clear') {
      setCalculation('');
    }
    if (value === 'del') {
      const result = calculation.slice(0, -1); //removes the last element from the string
      console.log('updateCalculation DEL', result);
      setCalculation(result);
    }
  };
  //Database functions
  //value = the new answer to be added to the database
  const sqlOperation = value => {
    console.log('App sqlOperation ', value);
    // let result = [];
    if (value === 'Display') {
      PassData(value);
    }
    //console.log('App sqlOperation ', JSON.stringify(res));

    // DbDisplay = [result];

    // DbDisplay.map((item, index) => {
    //   console.log('App DbDisplay ', item.answer);
    // });
    // }
  };

  return (
    <ImageBackground
      resizeMode="cover"
      //   source={require('./Assets/bgImage.jpg')}
      style={styles.image}>
      <View style={styles.container}>
        <SafeAreaView>
          <ScrollView>
            <View>
              <Text style={styles.sectionTitle}>Simple Calculator</Text>
              <View style={styles.calcBox}>
                <Text style={styles.outputText}>
                  {calculation || 'Enter a number'}
                </Text>
              </View>
              <calcButtons updateCalculation={updateCalculation} />
              <numberButtons updateCalculation={updateCalculation} />
              <dbButtons sqlOperation={sqlOperation} />
              <GetDb />
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  liContainer: {
    backgroundColor: '#fff',
    flex: 1,
    paddingLeft: 5,
  },

  liText: {
    color: '#333',
    fontSize: 17,
    fontWeight: '400',
    // marginBottom: -3.5,
    // marginTop: -3.5,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },

  container: {
    fontSize: 40,
    flex: 1,
  },

  calcBox: {
    height: 50,
    borderRadius: 40,
    paddingLeft: 20,
    paddingTop: 10,
    backgroundColor: 'oldlace',
    marginBottom: 10,
    borderWidth: 1,
  },
  outputText: {
    fontWeight: 'bold',
    textAlignVertical: 'center',
    textAlignment: 'right',
    fontSize: 30,
  },

  sectionTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlignVertical: 'center',
  },
});

export default App;
