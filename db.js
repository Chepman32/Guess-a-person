import * as SQLite from 'expo-sqlite'
const db = SQLite.openDatabase("appData.db")
export class DB {
  static init() {
    return new Promise((resolve, reject) => {
      db.transaction(tx =>{
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS appData (id INTEGER PRIMARY KEY NOT NULL, isAddOn INT)",
          [],
          resolve,
          (_, error) => reject(error)
        )
      })
    })
  }
  static getAppData() {
    return new Promise((resolve, reject) =>{
      db.transaction((tx => {
        tx.executeSql(
          "SELECT * FROM appData",
          [],
          (_, result) => resolve(result.rows._array),
          (_, error) => reject(error)
        )
      }))
    })
  }
  static addNewData({value}) {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          `INSERT INTO appData (isAddOn) VALUES (?)`,
          [value],
          (_, result) => resolve(result.insertId),
          (_, error) => reject(error)
        )
      })
    })
  }
  static updateIsAddOn() {
    return new Promise((resolve, reject) => {
      db.transaction(tx =>{
        tx.executeSql(
          "UPDATE appData isAddOn = ?",
          [!this.getAppData().isAddOn ? 0 : 1 ],
          resolve,
          (_, error) => reject(error)
        )
      })
    })
  }
}