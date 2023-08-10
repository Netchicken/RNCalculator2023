import {React, useState} from 'react';
import SQLite from 'react-native-sqlite-storage';
SQLite.enablePromise(true);
import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';
//https://blog.logrocket.com/using-sqlite-with-react-native/
// const db = SQLite.openDatabase('calcDB.db', '1.0', '', 1);

export const DBConnection = () => {
  enablePromise(true);
  return openDatabase('calcDB.db', '1.0', '', 1);
};

export class LoadDatabase {
  //this is called whenever we use a function below
  initDB() {
    let db;
    return new Promise(async (resolve, reject) => {
      try {
        await SQLite.echoTest();
        const DB = await SQLite.openDatabase('calcDB.db', '1.0', '', 1);

        db = DB;

        await db.executeSql(
          'CREATE TABLE IF NOT EXISTS AllAnswers(user_id INTEGER PRIMARY KEY NOT NULL, calc VARCHAR(30))',
        );

        resolve(db);
      } catch (error) {
        reject(error);
        console.log('error', error);
      }
    });
  }

  loadData() {
    return new Promise(async resolve => {
      try {
        const db = await this.initDB();

        db.transaction(async tx => {
          try {
            const [_, results] = await tx.executeSql(
              'SELECT * FROM AllAnswers',
              [],
            );

            const allData = [];
            const len = results.rows.length;

            for (let i = 0; i < len; i++) {
              const row = results.rows.item(i);
              console.log('item:', results.rows.item(i).calc);
              console.log('user_id:', results.rows.item(i).user_id);
              allData.push(row);

              let input = results.rows.item(i);
              console.log('input', input);
              console.log('input calc', input.calc);
            }

            console.log('alldata length = ', alldata.length);
            console.log('alldata values = ', Object.values(allData));
            console.log('alldata[1] = ', allData[1]);

            resolve(allData);
          } catch (error) {
            console.log('error', error);
          }
        });
      } catch (error) {
        console.log('error', error);
      }
    });
  }
}

// export const createTable = () => {
//   var db = DatabaseConnection();

//   db.transaction(function (tx) {
//     console.log('refresh', refresh);

//     // tx.executeSql('DROP TABLE IF EXISTS AllAnswers', []);
//     tx.executeSql(
//       'CREATE TABLE IF NOT EXISTS AllAnswers(user_id INTEGER PRIMARY KEY NOT NULL, calc VARCHAR(30))',
//       [],
//     );

//     //add sample data if there isn't any
//     // txn.executeSql('SELECT * FROM `AllAnswers`', [], function (tx, res) {
//     //   if (res.length === 0 || res.length === 'undefined') {
//     if (refresh === false) {
//       tx.executeSql('INSERT INTO AllAnswers (calc) VALUES (:calc)', ['1+2=3']);
//       tx.executeSql('INSERT INTO AllAnswers (calc) VALUES (:calc)', ['2-2=0']);
//     }
//     return db;
//   });
// };
