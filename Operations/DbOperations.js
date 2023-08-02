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
//import SQLiteStorage from 'react-native-sqlite-storage';
//https://www.npmjs.com/package/react-native-sqlite-2

const databaseName = 'calcDB.db';
const tableName = 'AllAnswers';
const fieldName = 'answer';
let db;
const listAnswers = [];
let singleAnswer = '';
//https://medium.com/infinitbility/react-native-sqlite-storage-422503634dd2

//https://github.com/craftzdog/react-native-sqlite-2#readme

export const PassData = ({data}) => {
  singleAnswer = data;
};

export const GetDb = () => {
  db = SQLite.openDatabase({
    name: 'calcDB',
    location: 'default',
    createFromLocation: '~calcDB.db',
  });
  console.log(
    'getDb Answers db',
    JSON.stringify(db) + ' ' + JSON.stringify(singleAnswer),
  );

  let params = [];
  // const createString2 =
  //   'CREATE TABLE "AllAnswers" ("Id"	INTEGER NOT NULL UNIQUE,	"answer"	TEXT,	PRIMARY KEY("Id" AUTOINCREMENT))';
  const createString =
    'CREATE TABLE IF NOT EXISTS AllAnswers(Id INTEGER PRIMARY KEY NOT NULL, TEXT,	PRIMARY KEY("Id" AUTOINCREMENT))';

  //console.log('createString', createString);

  db.transaction(txn => {
    txn.executeSql(
      createString,
      params,
      (trans, results) => {
        //  console.log('execute success results: ' + JSON.stringify(results));
        //  console.log('execute success transaction: ' + JSON.stringify(trans));
      },
      error => {
        console.log('execute error: ' + JSON.stringify(error));
        // reject(error);
      },
    );

    if (singleAnswer !== '') {
      txn.executeSql(
        'INSERT INTO AllAnswers (answer) VALUES ( "' + singleAnswer + '")',
        [],
      );
    }
    //  txn.executeSql('INSERT INTO AllAnswers (answer) VALUES ("222*2=456")', []);

    txn.executeSql('SELECT answer FROM AllAnswers', [], function (tx, result) {
      for (let i = 0; i < result.rows.length; ++i) {
        var data = result.rows.item(i);
        listAnswers.push(data); //add data to the list
        console.log('DbOp each item:', data);
      }
      //check if its there
      listAnswers.map(item => {
        console.log('DbOp listAnswers', item);
      });
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
