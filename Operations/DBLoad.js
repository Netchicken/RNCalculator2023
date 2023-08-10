import {React, useState} from 'react';
import {DatabaseConnection} from './Database/DbConnection';

export const LoadDB = () => {
    let [inputUserId, setInputUserId] = useState('');

    const [refresh, setRefresh] = useState(false);
    // const db = SQLite.openDatabase('calcDB.db', '1.0', '', 1);
    const db = DatabaseConnection

    db.transaction(function (tx) {
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

        tx.executeSql('SELECT * FROM `AllAnswers`', [], (tx, results) => {
            for (let i = 0; i < results.rows.length; ++i) {
                console.log('item:', results.rows.item(i).calc);
                console.log('user_id:', results.rows.item(i).user_id);
                let input = results.rows.item(i); //JSON.stringify(res.rows.item(i));
                console.log('input', input);
                console.log('input calc', input.calc);
                alldata.push(input);
            }

            console.log('alldata length = ', alldata.length);
            console.log('alldata values = ', Object.values(alldata));
            console.log('alldata[1] = ', alldata[1]);
        });
    });
}