import {React, useState} from 'react';
import SQLite from 'react-native-sqlite-storage';
SQLite.enablePromise(true);

const initDB = () => {
  console.log('initDB triggered');
  return new Promise(async (resolve, reject) => {
    await SQLite.echoTest().then(() => {
      console.log('echoTest Successful');
    });

    // DB = SQLite.openDatabase('calcDB.db');
    //const DB = await SQLite.openDatabase('calcDB.db', '1.0', '', 1);
    const db = await SQLite.openDatabase(
      {
        name: 'calcDB.db',
        createFromLocation: 1,
        location: 'default',
      },
      () => {
        //========================Quick Data check========================================
        db.transaction(async tx => {
          tx.executeSql(
            'CREATE TABLE IF NOT EXISTS AllAnswers(user_id INTEGER PRIMARY KEY NOT NULL, calc VARCHAR(30))',
            [],
          );
          tx.executeSql('INSERT INTO AllAnswers VALUES (?)', ['1+2=3333']);
          tx.executeSql('INSERT INTO AllAnswers  VALUES (?)', ['2-2=0000']);

          tx.executeSql('SELECT answer FROM AllAnswers', [], (x, results) => {
            const len = results.rows.length;
            console.log('LoadDatabase in INIT len', len);
            if (len > 0) {
              for (let i = 0; i < len; i++) {
                //  let answer = results.rows.item(i);
                console.log('input', i + ' - ' + results.rows.item(i));
              }
            }
          });
        });
        //======================End Quick Data check========================================

        resolve(db); //this is our return
        console.log('db connection success');
      },
      error => {
        reject(error);
        console.log('db connection error');
        console.log(error);
      },
    );
  });
};

export const LoadDatabase = () => {
  console.log('LoadDatabase triggered');
  //this is called whenever we use a function below
  //await SQLite.openDatabase('calcDB.db', '1.0', '', 1); //
  return new Promise(async resolve => {
    try {
      const db = await initDB();

      console.log('LoadDatabase promise triggered', db);
      db.transaction(async tx => {
        try {
          let allData = [];
          await tx.executeSql('SELECT * FROM AllAnswers', [], (x, results) => {
            const len = results.rows.length;
            console.log('LoadDatabase len', len);
            if (len > 0) {
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
            }
          });
          resolve(allData);
        } catch (error) {
          console.log('LoadDatabase error', error + ' ' + allData);
        }
      });
    } catch (error) {
      console.log('error', error);
    }
  });
};

//SQLite.DEBUG(true);
//https://blog.logrocket.com/using-sqlite-with-react-native/
// const db = SQLite.openDatabase('calcDB.db', '1.0', '', 1);

// export const DBConnection = () => {
//   enablePromise(true);
//   return openDatabase('calcDB.db', '1.0', '', 1);
// };

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

// await db.executeSql(
//   'CREATE TABLE IF NOT EXISTS AllAnswers(user_id INTEGER PRIMARY KEY NOT NULL, calc VARCHAR(30))',
// ),
//   [];
// db.transaction(async tx => {
//   tx.executeSql('INSERT INTO AllAnswers (calc) VALUES (:calc)', [
//     '1+2=3',
//   ]);
//   tx.executeSql('INSERT INTO AllAnswers (calc) VALUES (:calc)', [
//     '2-2=0',
//   ]);
// });
