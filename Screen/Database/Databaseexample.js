import SQLite from 'react-native-sqlite-storage';
SQLite.enablePromise(true);

//https://github.com/MohGovIL/hamagen-react-native/blob/0dcfcebc3f54d1e279afa2ab44ebaeaf87979bb3/src/database/Database.js

const database_name = 'calcDB.db';
const database_version = '1.0';
const database_displayname = 'SQLite React Offline Database';
const database_size = 10000000;

export class LoadDatabase {
  initDB() {
    let db;
    return new Promise(async (resolve, reject) => {
      try {
        await SQLite.echoTest();

        const DB = await SQLite.openDatabase(
          database_name,
          database_version,
          database_displayname,
          database_size,
        );

        db = DB;

        await db.executeSql(
          'CREATE TABLE IF NOT EXISTS Samples (lat,long,accuracy,startTime,endTime,geoHash,wifiHash,hash);',
        );

        resolve(db);
      } catch (error) {
        reject(error);
        console.log('error', error);
      }
    });
  }

  listSamples() {
    return new Promise(async resolve => {
      try {
        const db = await this.initDB();

        db.transaction(async tx => {
          try {
            const [_, results] = await tx.executeSql(
              'SELECT * FROM Samples',
              [],
            );

            const samples = [];
            const len = results.rows.length;

            for (let i = 0; i < len; i++) {
              const row = results.rows.item(i);
              samples.push(row);
            }

            resolve(samples);
          } catch (error) {
            console.log('error', error);
          }
        });
      } catch (error) {
        console.log('error', error);
      }
    });
  }

  updateLastSampleEndTime(endTime) {
    return new Promise(async resolve => {
      try {
        const db = await this.initDB();

        db.transaction(async tx => {
          try {
            const [_, results] = await tx.executeSql(
              `UPDATE Samples set endTime=${endTime} WHERE rowid=(SELECT MAX(rowid) from Samples)`,
            );

            if (results.rows.length > 0) {
              const row = results.rows.item(0);
              resolve(row);
            } else {
              resolve(null);
            }
          } catch (error) {
            console.log('error', error);
          }
        });
      } catch (error) {
        console.log('error', error);
      }
    });
  }

  addSample(sample) {
    return new Promise(async resolve => {
      try {
        const db = await this.initDB();

        db.transaction(async tx => {
          try {
            const [_, results] = await tx.executeSql(
              'INSERT INTO Samples VALUES (?,?,?,?,?,?,?,?)',
              [
                sample.lat,
                sample.long,
                sample.accuracy,
                sample.startTime,
                sample.endTime,
                sample.geoHash,
                sample.wifiHash,
                sample.hash,
              ],
            );
            resolve(results);
          } catch (error) {
            console.log('error', error);
          }
        });
      } catch (error) {
        console.log('error', error);
      }
    });
  }

  insertBulkSamples(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const db = await this.initDB();

        await db.transaction(async tx => {
          try {
            data = data.replace(/[()]/g, '').split(',');
            data = data.map(sample =>
              isNaN(parseFloat(sample)) ? sample : parseFloat(sample),
            );

            const numberOfBulks = Math.ceil(data.length / 800);
            const bulks = Array.from({length: numberOfBulks}, (_, index) =>
              data.slice(index * 800, (index + 1) * 800),
            );

            await Promise.all(
              bulks.map(bulkData => {
                const samples = Array.from(
                  {length: bulkData.length / 8},
                  () => '(?,?,?,?,?,?,?,?)',
                ).toString();
                return tx.executeSql(
                  `INSERT INTO Samples VALUES ${samples}`,
                  bulkData,
                );
              }),
            );

            resolve();
          } catch (error) {
            console.log('error', error);
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  purgeSamplesTable(timestamp) {
    return new Promise(async resolve => {
      try {
        const db = await this.initDB();

        db.transaction(async tx => {
          try {
            await tx.executeSql(
              'DELETE FROM Samples WHERE endTime < ? OR endTime IS NULL',
              [timestamp],
            );
            resolve(true);
          } catch (error) {
            console.log('error', error);
          }
        });
      } catch (error) {
        console.log('error', error);
      }
    });
  }

  updateSamplesToUTC() {
    return new Promise(async resolve => {
      try {
        const db = await this.initDB();

        db.transaction(async tx => {
          try {
            const [_, results] = await tx.executeSql(
              'UPDATE Samples set startTime = startTime - 7200000, endTime = endTime - 7200000',
            );
            resolve(results);
          } catch (error) {
            console.log('error', error);
          }
        });
      } catch (error) {
        console.log('error', error);
      }
    });
  }

  getLastPointEntered() {
    return new Promise(async resolve => {
      try {
        const db = await this.initDB();

        db.transaction(async tx => {
          try {
            const [_, results] = await tx.executeSql(
              'SELECT * from Samples WHERE rowid=(SELECT MAX(rowid) from Samples)',
            );
            if (results.rows.length > 0) {
              const row = results.rows.item(0);
              resolve(row);
            } else {
              resolve(null);
            }
          } catch (error) {
            console.log('error', error);
          }
        });
      } catch (error) {
        console.log('error', error);
      }
    });
  }

  getBufferSamplesForClustering(bufferSize) {
    return new Promise(async resolve => {
      try {
        const db = await this.initDB();

        db.transaction(async tx => {
          try {
            const [_, results] = await tx.executeSql(
              'select * from (select * from Samples order by rowid DESC limit ?);',
              [bufferSize],
            );

            const samples = [];
            const len = results.rows.length;

            for (let i = 0; i < len; i++) {
              const row = results.rows.item(i);
              samples.push(row);
            }

            resolve(samples.reverse());
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

export class IntersectionSickDatabase {
  initDB() {
    let db;
    return new Promise(async (resolve, reject) => {
      try {
        await SQLite.echoTest();

        const DB = await SQLite.openDatabase(
          database_name,
          database_version,
          database_displayname,
          database_size,
        );

        db = DB;

        await db.executeSql(
          'CREATE TABLE IF NOT EXISTS IntersectingSick (OBJECTID,Name,Place,Comments,fromTime,toTime,long,lat,wasThere,BLETimestamp);',
        );

        resolve(db);
      } catch (error) {
        reject(error);
        console.log('error', error);
      }
    });
  }

  listAllRecords() {
    return new Promise(async resolve => {
      try {
        const db = await this.initDB();

        db.transaction(async tx => {
          try {
            const [_, results] = await tx.executeSql(
              'SELECT * FROM IntersectingSick',
              [],
            );

            const IntersectingSick = [];
            const len = results.rows.length;

            for (let i = 0; i < len; i++) {
              const row = results.rows.item(i);
              IntersectingSick.push(row);
            }

            resolve(IntersectingSick);
          } catch (error) {
            console.log('error', error);
          }
        });
      } catch (error) {
        console.log('error', error);
      }
    });
  }

  getGeoRecord = async (OBJECTID, db) =>
    new Promise(async resolve => {
      db.transaction(async tx => {
        try {
          const [_, results] = await tx.executeSql(
            `SELECT * FROM IntersectingSick WHERE OBJECTID =${OBJECTID}`,
          );

          const item = results.rows.item(0);

          resolve(item);
        } catch (error) {
          console.log('error', error);
        }
      });
    });

  getBleRecord = async (BLETimestamp, db) =>
    new Promise(async resolve => {
      db.transaction(async tx => {
        try {
          const [_, results] = await tx.executeSql(
            `SELECT * FROM IntersectingSick WHERE BLETimestamp =${BLETimestamp}`,
          );

          const item = results.rows.item(0);

          resolve(item);
        } catch (error) {
          console.log('error', error);
        }
      });
    });

  purgeIntersectionSickTable(timestamp) {
    return new Promise(async resolve => {
      try {
        const db = await this.initDB();

        db.transaction(async tx => {
          try {
            await tx.executeSql(
              'DELETE FROM IntersectingSick WHERE toTime IS NOT NULL AND toTime < ? OR BLETimestamp IS NOT NULL AND BLETimestamp < ?',
              [timestamp, timestamp],
            );
            resolve(true);
          } catch (error) {
            console.log('error', error);
          }
        });
      } catch (error) {
        console.log('error', error);
      }
    });
  }

  containsObjectID(OBJECTID) {
    return new Promise(async resolve => {
      try {
        const db = await this.initDB();

        db.transaction(async tx => {
          try {
            const [_, results] = await tx.executeSql(
              `SELECT * FROM IntersectingSick WHERE OBJECTID =${OBJECTID}`,
            );

            resolve(results.rows.length > 0);
          } catch (error) {
            console.log('error', error);
          }
        });
      } catch (error) {
        console.log('error', error);
      }
    });
  }

  containsBLE(BLETimestamp) {
    return new Promise(async resolve => {
      try {
        const db = await this.initDB();

        db.transaction(async tx => {
          const [_, results] = await tx.executeSql(
            `SELECT * FROM IntersectingSick WHERE BLETimestamp =${BLETimestamp}`,
          );

          resolve(results?.rows?.length > 0);
        });
      } catch (error) {
        console.log('error', error);
        resolve(null);
      }
    });
  }

  async deleteAll() {
    if (!__DEV__) return;
    try {
      const db = await this.initDB();

      db.transaction(async tx => {
        await tx.executeSql('DROP TABLE IntersectingSick');
      });
    } catch (e) {
      onError({e});
    }
  }

  addSickRecord(record) {
    return new Promise(async resolve => {
      try {
        const db = await this.initDB();

        db.transaction(async tx => {
          try {
            await tx.executeSql(
              'INSERT INTO IntersectingSick VALUES (?,?,?,?,?,?,?,?,?,?)',
              [
                record.properties.Key_Field,
                record.properties.Name,
                record.properties.Place,
                record.properties.Comments,
                record.properties.fromTime_utc,
                record.properties.toTime_utc,
                record.geometry.coordinates[config().sickGeometryLongIndex],
                record.geometry.coordinates[config().sickGeometryLatIndex],
                null,
                null,
              ],
            );

            const item = await this.getGeoRecord(
              record.properties.Key_Field,
              db,
            );
            resolve(item);
          } catch (error) {
            resolve(record.properties);
            console.log('error', error);
          }
        });
      } catch (error) {
        resolve(record.properties);
        console.log('error', error);
      }
    });
  }

  addBLESickRecord(BLETimestamp) {
    return new Promise(async resolve => {
      try {
        const db = await this.initDB();

        return db.transaction(async tx => {
          await tx.executeSql(
            'INSERT INTO IntersectingSick (BLETimestamp,wasThere) VALUES (?,?)',
            [BLETimestamp, true],
          );
          const item = await this.getBleRecord(BLETimestamp, db);

          resolve(item);
        });
      } catch (error) {
        console.log('error', error);
        resolve({BLETimestamp, wasThere: true});
      }
    });
  }

  async MergeBLEIntoSickRecord(OBJECTID, BLETimestamp) {
    return new Promise(async resolve => {
      try {
        const db = await this.initDB();
        db.transaction(async tx => {
          const [_, results] = await tx.executeSql(
            'UPDATE IntersectingSick SET wasThere = ?, BLETimestamp = ? WHERE OBJECTID = ?',
            [true, BLETimestamp, OBJECTID],
          );

          if (results.rows.length > 0) {
            resolve(results.rows.item(0));
          }
          resolve(null);
        });
      } catch (error) {
        console.log('error', error);
        resolve(null);
      }
    });
  }

  //
  async MergeGeoIntoSickRecord(record, BLETimestamp) {
    return new Promise(async resolve => {
      try {
        const db = await this.initDB();

        return db.transaction(async tx => {
          const [_, results] = await tx.executeSql(
            'UPDATE IntersectingSick SET OBJECTID = ?,Name = ?,Place = ?,Comments = ?,fromTime = ?,toTime = ?,long = ?,lat = ?,wasThere =?  WHERE BLETimestamp = ?',
            [
              record.properties.Key_Field,
              record.properties.Name,
              record.properties.Place,
              record.properties.Comments,
              record.properties.fromTime_utc,
              record.properties.toTime_utc,
              record.geometry.coordinates[config().sickGeometryLongIndex],
              record.geometry.coordinates[config().sickGeometryLatIndex],
              true,
              BLETimestamp,
            ],
          );
          results;

          if (results.rowsAffected > 0) {
            resolve(results.rows.item(0));
          }

          resolve(null);
        });
      } catch (error) {
        console.log('error', error);
        resolve(null);
      }
    });
  }

  async migrateTable() {
    return new Promise(async resolve => {
      try {
        await SQLite.echoTest();

        const DB = await SQLite.openDatabase(
          database_name,
          database_version,
          database_displayname,
          database_size,
        );

        await DB.executeSql('ALTER TABLE IntersectingSick ADD wasThere NULL;');
        await DB.executeSql(
          'ALTER TABLE IntersectingSick ADD BLETimestamp NULL',
        );

        resolve(null);
      } catch (error) {
        console.log('migrateTable error:', error);

        console.log('error', error);
        resolve(null);
      }
    });
  }

  async updateSickRecord(record) {
    return new Promise(async resolve => {
      try {
        const db = await this.initDB();

        db.transaction(async tx => {
          const [_, results] = await tx.executeSql(
            'UPDATE IntersectingSick SET wasThere = ? WHERE OBJECTID = ?',
            [record.properties.wasThere, record.properties.OBJECTID],
          );

          if (results.rows.length > 0) {
            resolve(results.rows.item(0));
          }

          resolve(null);
        });
      } catch (error) {
        console.log('error', error);

        resolve(null);
      }
    });
  }

  // first load after app update add wasThere property to dismissed exposures
  async upgradeSickRecord(wasThere, IDs) {
    return new Promise(async resolve => {
      try {
        if (IDs.length > 0) {
          const db = await this.initDB();

          return db.transaction(async tx => {
            tx.executeSql(
              `UPDATE IntersectingSick SET wasThere = ? WHERE OBJECTID IN (${IDs.map(
                () => '?',
              ).join(',')})`,
              [wasThere ? 1 : 0, ...IDs],
            );
          });
        }
      } catch (error) {
        console.log('error', error);
      } finally {
        resolve(null);
      }
    });
  }
}
