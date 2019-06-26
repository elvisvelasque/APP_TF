import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class dbService {

  db: SQLiteObject = null;

  constructor() {}

  setDatabase(db: SQLiteObject){
    if(this.db === null){
      this.db = db;
    }
  }

  create(category: any, percent: any, fecha: any, imagen: any){
    let sql = 'INSERT INTO tasks(category, percent, fecha, imagen, id_user) VALUES(?,?,?,?,?)';
    return this.db.executeSql(sql, [category, percent, fecha ,imagen, id_user]);
  }

  create2(nombre: any, apellido: any, dni: any, genero: any){
    let sql = 'INSERT INTO users(nombre, apellido, dni, genero) VALUES(?,?,?,?)';
    return this.db.executeSql(sql, [nombre, apellido, dni, genero]);
  }

  createTable(){
    let sql = 'CREATE TABLE IF NOT EXISTS tasks(id INTEGER PRIMARY KEY AUTOINCREMENT, category TEXT, percent TEXT, fecha TEXT, imagen TEXT , id_user INTEGER NULL)';
    return this.db.executeSql(sql, []);
  }

  createTable2(){
    let sql = 'CREATE TABLE IF NOT EXISTS users(id_user INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT, apellido TEXT, dni TEXT, genero TEXT)';
    return this.db.executeSql(sql, []);
  }

  delete(task: any){
    let sql = 'DELETE FROM tasks WHERE id=?';
    return this.db.executeSql(sql, [task.id]);
  }

  getAll(){
    let sql = 'SELECT * FROM tasks';
    return this.db.executeSql(sql, [])
    .then(response => {
      let tasks = [];
      for (let index = 0; index < response.rows.length; index++) {
        tasks.push( response.rows.item(index) );
      }
      return Promise.resolve( tasks );
    })
    .catch(error => Promise.reject(error));
  }

  //update(task: any){
  //  let sql = 'UPDATE tasks SET title=?, completed=? WHERE id=?';
  //  return this.db.executeSql(sql, [task.title, task.completed, task.id]);
 // }


}