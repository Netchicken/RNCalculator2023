import {React, useState} from 'react';

import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';
//https://blog.logrocket.com/using-sqlite-with-react-native/
// const db = SQLite.openDatabase('calcDB.db', '1.0', '', 1);

export const DatabaseConnection = () => {
  enablePromise(true);
  return openDatabase('calcDB.db', '1.0', '', 1);
};

export const createTable = () => {
  var db = DatabaseConnection();

  db.transaction(function (tx) {
    console.log('refresh', refresh);

    // tx.executeSql('DROP TABLE IF EXISTS AllAnswers', []);
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS AllAnswers(user_id INTEGER PRIMARY KEY NOT NULL, calc VARCHAR(30))',
      [],
    );

    //add sample data if there isn't any
    // txn.executeSql('SELECT * FROM `AllAnswers`', [], function (tx, res) {
    //   if (res.length === 0 || res.length === 'undefined') {
    if (refresh === false) {
      tx.executeSql('INSERT INTO AllAnswers (calc) VALUES (:calc)', ['1+2=3']);
      tx.executeSql('INSERT INTO AllAnswers (calc) VALUES (:calc)', ['2-2=0']);
    }
    return db;
  });
};
