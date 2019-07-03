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

  create(category: any, percent: any, fecha: any, imagen: any, dni: any){
    let sql = 'INSERT INTO tasks(category, percent, fecha, imagen, dni) VALUES(?,?,?,?,?)';
    return this.db.executeSql(sql, [category, percent, fecha ,imagen, dni]);
  }

  create2(nombres: any, apellidos: any, dni: any, sexo: any){
    let sql = 'INSERT INTO tasks(nombres, apellidos, dni, sexo) VALUES(?,?,?,?)';
    return this.db.executeSql(sql, [nombres, apellidos, dni, sexo]);
  }

  createTable(){
    let sql = 'CREATE TABLE IF NOT EXISTS tasks(id INTEGER PRIMARY KEY AUTOINCREMENT, category TEXT, percent TEXT, fecha TEXT, imagen TEXT, nombres TEXT, apellidos TEXT, dni TEXT, sexo TEXT)';
    return this.db.executeSql(sql, []);
  }
/*
  createTable2(){
    let sql = 'CREATE TABLE IF NOT EXISTS users(id_user INTEGER PRIMARY KEY AUTOINCREMENT, nombres TEXT, apellidos TEXT, dni TEXT, sexo TEXT)';
    return this.db.executeSql(sql, []);
  }
*/
  delete(task: any){
    let sql = 'DELETE FROM tasks WHERE id=?';
    return this.db.executeSql(sql, [task.id]);
  }

  /*
  selectp(persona: any){
    let sql = 'SELECT * FROM USERS A INNER JOIN TASKS B ON A.ID_USER=B.ID AND ID=?';
    return this.db.executeSql(sql, [persona.id]);
  } */

  getAll(){
    let sql = 'SELECT id, category, percent, fecha, imagen  FROM tasks where fecha is not null';
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

  getSelect(user: any){
    let sql = 'SELECT id, category, percent, fecha, imagen  FROM tasks where dni=? and fecha is not null';
    return this.db.executeSql(sql, [user.dni])
    .then(response => {
      let fotos = [];
      for (let index = 0; index < response.rows.length; index++) {
        fotos.push( response.rows.item(index) );
      }
      return Promise.resolve( fotos );
    })
    .catch(error => Promise.reject(error));
  }

  getUsers(){
    let sql = 'SELECT nombres, apellidos, dni, sexo FROM tasks where fecha is null and dni is not null';
    return this.db.executeSql(sql, [])
    .then(response => {
      let users = [];
      for (let index = 0; index < response.rows.length; index++) {
        users.push( response.rows.item(index) );
      }
      return Promise.resolve( users );
    })
    .catch(error => Promise.reject(error));
  }

  getUsersDocs(){
    let sql = 'SELECT distinct trim(dni) FROM tasks where fecha is null and dni is not null';
    return this.db.executeSql(sql, [])
    .then(response => {
      let docs = [];
      for (let index = 0; index < response.rows.length; index++) {
        docs.push( response.rows.item(index).dni );
      }
      return Promise.resolve( docs );
    })
    .catch(error => Promise.reject(error));
  }

  //update(task: any){
  //  let sql = 'UPDATE tasks SET title=?, completed=? WHERE id=?';
  //  return this.db.executeSql(sql, [task.title, task.completed, task.id]);
 // }


}