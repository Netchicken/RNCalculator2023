import {React, useState} from 'react';
import SQLite from 'react-native-sqlite-storage';

export const DatabaseConnection = {
  getConnection: () => SQLite.openDatabase('calcDB.db', '1.0', '', 1),
};
