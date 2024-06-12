import * as SQlite from 'expo-sqlite';

const tarefas = SQlite.openDatabaseAsync('tarefas.db');

export default tarefas;