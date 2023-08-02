import {React, useState} from 'react';
import SQLite from 'react-native-sqlite-2';
import {
  StyleSheet, // CSS-like styles
  Text, // Renders text
  TouchableOpacity, // Handles row presses
  SafeAreaView,
  ScrollView,
  View,
  Section,
} from 'react-native';

const [listAnswers, setlistAnswers] = useState([]);

export const LoadDB = () => {
  const db = SQLite.openDatabase('calcDB.db', '1.0', '', 1);
  db.transaction(function (txn) {
    // txn.executeSql('DROP TABLE IF EXISTS Users', [])
    // txn.executeSql(
    //   'CREATE TABLE IF NOT EXISTS Users(user_id INTEGER PRIMARY KEY NOT NULL, calc VARCHAR(30))',
    //   []
    // )
    txn.executeSql('INSERT INTO Users (calc) VALUES (:calc)', ['1+2=3']);
    txn.executeSql('INSERT INTO Users (calc) VALUES (:calc)', ['4-2=2']);
    txn.executeSql('SELECT * FROM `users`', [], function (tx, res) {
      for (let i = 0; i < res.rows.length; ++i) {
        console.log('item:', res.rows.item(i));
        setlistAnswers(...listAnswers, res.rows.item(i));
      }
    });
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* <Section
        style={styles.sectionTitle}
        title="View calculations in the Database"></Section> */}

      {/* <TouchableOpacity
        // onPress={() => selectDataHandler()}
        style={styles.UpdateButton}>
        <Text style={styles.UpdateButtonText}>Show Cities</Text>
      </TouchableOpacity>
      <TouchableOpacity
        // onPress={() => removeDataHandler()}
        style={styles.DeleteButton}>
        <Text style={styles.DeleteButtonText}>Delete All Cities</Text>
      </TouchableOpacity> */}

      <ScrollView>
        {listAnswers.map((item, index) => {
          return (
            <View>
              <Text key={index} style={styles.text}>
                {item}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 2,
  },
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

//  <FlatList
//    data={DbDisplay}
//    style={styles.liContainer}
//    renderItem={({item}) => <Text style={styles.liText}>{item.answer}</Text>}
//  />;
