import {React, useState} from 'react';
import SQLite from 'react-native-sqlite-2';
import {
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  ImageBackground,
} from 'react-native';
import {TouchableOpacityButton} from '../Components/AllButtons';
//const [listAnswers, setlistAnswers] = useState([]);
let alldata = [];
//Database functions
//value = the new answer to be added to the database
// const sqlOperation = (value: Data) => {
//   console.log('App sqlOperation ', value);
//   // let result = [];
//   if (value === 'Display') {
//     PassData(value);
//   }
//console.log('App sqlOperation ', JSON.stringify(res));

// DbDisplay = [result];

// DbDisplay.map((item, index) => {
//   console.log('App DbDisplay ', item.answer);
// });
// }
// };

export const LoadDB = ({navigation}) => {
  const db = SQLite.openDatabase('calcDB.db', '1.0', '', 1);

  db.transaction(function (txn) {
    txn.executeSql('DROP TABLE IF EXISTS AllAnswers', []);
    txn.executeSql(
      'CREATE TABLE IF NOT EXISTS AllAnswers(user_id INTEGER PRIMARY KEY NOT NULL, calc VARCHAR(30))',
      [],
    );
    txn.executeSql('INSERT INTO AllAnswers (calc) VALUES (:calc)', ['1+2=3']);
    txn.executeSql('INSERT INTO AllAnswers (calc) VALUES (:calc)', ['4-2=2']);
    txn.executeSql('SELECT * FROM `AllAnswers`', [], function (tx, res) {
      for (let i = 0; i < res.rows.length; ++i) {
        console.log('item:', res.rows.item(i).calc);
        alldata.push(res.rows.item(i).value);
      }
      console.log('alldata length = ', alldata.length);
      console.log('alldata values = ', Object.values(alldata));
      console.log('alldata[1] = ', alldata[1]);
    });
  });

  return (
    <ImageBackground
      resizeMode="cover"
      source={require('../Assets/bgImage.jpg')}
      style={styles.image}>
      <View style={styles.container}>
        <SafeAreaView style={styles.container}>
          <ScrollView>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>
                Database Page {alldata[1]}
              </Text>
            </View>

            {alldata.map((item, index) => {
              return (
                <View>
                  <Text key={index} style={styles.text}>
                    {item}
                  </Text>
                </View>
              );
            })}
            <TouchableOpacityButton
              onPress={() => navigation.navigate('Calculator')}
              title="Go to Calculator"
            />
          </ScrollView>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  // text: {
  //   fontSize: 20,
  //   fontWeight: 'bold',
  //   margin: 2,
  // },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // flexDirection: 'column',
  },

  UpdateButton: {
    width: 120,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  UpdateButtonText: {
    color: '#fff',
  },
  DeleteButton: {
    width: 120,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  DeleteButtonText: {
    color: '#fff',
  },

  sectionContainer: {
    marginTop: 10,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    justifyContent: 'center',
    textAlign: 'center',
  },
});

{
  /* <Section
        style={styles.sectionTitle}
        title="View calculations in the Database"></Section> */
}

{
  /* <TouchableOpacity
        // onPress={() => selectDataHandler()}
        style={styles.UpdateButton}>
        <Text style={styles.UpdateButtonText}>Show Cities</Text>
      </TouchableOpacity>
      <TouchableOpacity
        // onPress={() => removeDataHandler()}
        style={styles.DeleteButton}>
        <Text style={styles.DeleteButtonText}>Delete All Cities</Text>
      </TouchableOpacity> */
}