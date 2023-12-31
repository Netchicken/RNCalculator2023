import {React, useState} from 'react';
import {LoadDatabase} from '../Operations/DbConnection';
//import DbDelete from './Database/DbDelete';

import {
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  ImageBackground,
} from 'react-native';
import {
  TouchableOpacityButton,
  PressableButton,
} from '../Components/AllButtons';

const DbOperations = ({navigation}) => {
  let alldata = LoadDatabase();
  //alldata = db;
  // console.log('alldata[1]', alldata[1]);

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
                {alldata.map((item, index) => {
                  return (
                    <View>
                      <PressableButton
                        key={index}
                        onPress={() => DeleteItem(item.user_id)}
                        symbol={item.calc}
                      />

                      <Text key={index} style={styles.sectionTitle}>
                        {item.calc} and {item.user_id}
                      </Text>
                    </View>
                  );
                })}
              </Text>
            </View>

            <TouchableOpacityButton
              onPress={() => navigation.navigate('Calculator')}
              text="Go to Calculator"
            />
          </ScrollView>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
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

export default DbOperations;

{
  /* <Section
        style={styles.sectionTitle}
        title="View calculations in the Database"></Section> */
}

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

// let alldata = [];

// export const LoadDB = ({navigation}) => {
//   let [inputUserId, setInputUserId] = useState('');

//   const [refresh, setRefresh] = useState(false);

//   const db = createTable();
//   console.log('db', DatabaseConnection());
//   db.transaction(function (tx) {
//   console.log('refresh', refresh);

//   tx.executeSql('DROP TABLE IF EXISTS AllAnswers', []);
//   tx.executeSql(
//     'CREATE TABLE IF NOT EXISTS AllAnswers(user_id INTEGER PRIMARY KEY NOT NULL, calc VARCHAR(30))',
//     [],
//   );

//   //add sample data if there isn't any
//   // txn.executeSql('SELECT * FROM `AllAnswers`', [], function (tx, res) {
//   //   if (res.length === 0 || res.length === 'undefined') {
//   if (refresh === false) {
//     tx.executeSql('INSERT INTO AllAnswers (calc) VALUES (:calc)', ['1+2=3']);
//     tx.executeSql('INSERT INTO AllAnswers (calc) VALUES (:calc)', ['2-2=0']);
//   }

//     console.log('Added sample data, res.length = ', res.length);
//   }
// });

//     tx.executeSql('SELECT * FROM `AllAnswers`', [], (tx, results) => {
//       for (let i = 0; i < results.rows.length; ++i) {
//         console.log('item:', results.rows.item(i).calc);
//         console.log('user_id:', results.rows.item(i).user_id);
//         let input = results.rows.item(i); //JSON.stringify(res.rows.item(i));
//         console.log('input', input);
//         console.log('input calc', input.calc);
//         alldata.push(input);
//       }

//       console.log('alldata length = ', alldata.length);
//       console.log('alldata values = ', Object.values(alldata));
//       console.log('alldata[1] = ', alldata[1]);
//     });
//   });
