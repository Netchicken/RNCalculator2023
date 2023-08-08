import {React, useState} from 'react';
import SQLite from 'react-native-sqlite-storage';
import {DatabaseConnection} from 'DbConnection';
import {View, Alert, SafeAreaView} from 'react-native';

const DbDelete = user_id => {
  // const db = DatabaseConnection.getConnection();
  const db = SQLite.openDatabase('calcDB.db', '1.0', '', 1);
  if (user_id === undefined) {
    console.log('Error', 'User Id is not defined ');
  }
  db.transaction(function (txn) {
    txn.executeSql(
      'DELETE FROM AllAnswers WHERE user_id = ?',
      [user_id],
      (tx, results) => {
        console.log('Results', results.rowsAffected);
        if (results.rowsAffected > 0) {
          console.log('Sucesso', 'Usuário Excluído com Sucesso !');
        }
      },
    );
  });
  console.log('Delete  = ', user_id);
};

// return <div>DbDelete</div>;
//};

export default DbDelete;
