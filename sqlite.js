import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('todo.db');

export const setupDatabase = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT, completed INTEGER);'
    );
  });
};

export const addTask = (title, description, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO tasks (title, description, completed) VALUES (?, ?, 0);',
      [title, description],
      (_, result) => callback(result),
      (_, error) => console.error(error)
    );
  });
};

export const getTasks = (callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM tasks;',
      [],
      (_, { rows: { _array } }) => callback(_array),
      (_, error) => console.error(error)
    );
  });
};

export const deleteTask = (id, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'DELETE FROM tasks WHERE id = ?;',
      [id],
      (_, result) => callback(result),
      (_, error) => console.error(error)
    );
  });
};
